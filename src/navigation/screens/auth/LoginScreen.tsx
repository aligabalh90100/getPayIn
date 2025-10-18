import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import React from "react";
import ScreenHeader from "@/components/Header/ScreenHeader";
import CustomText from "@/components/CustomText";
import BaseTextInput from "@/components/BaseTextInput";
import { useForm } from "react-hook-form";
import BaseButton from "@/components/BaseButton";
import { handleLogin, ILoginData } from "@/network/auth";
import { useMutation } from "@tanstack/react-query";
import { errorToast } from "@/helpers/ustil";
import SecureStorage from "@/services/secureStorage";
import useAppNavigation from "@/navigation/routes";
import { useAppDispatch } from "@/services/redux";
import { setUser } from "@/services/redux/userSlice";

const LoginScreen = () => {
  const dispatch = useAppDispatch();
  const { replace } = useAppNavigation();
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<ILoginData>({
    mode: "all",
    defaultValues: { username: "emilys", password: "emilyspass" },
  });
  const { mutate, isPending } = useMutation({
    mutationFn: handleLogin,
    onSuccess: (response) => {
      SecureStorage.set("getPayInToken", response.accessToken);
      dispatch(setUser(response));
      replace("App");
    },
    onError: (error) => errorToast(error?.message || "Something went wrong"),
  });

  const submitData = handleSubmit(async (data) => {
    mutate(data);
  });

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={60}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ScreenHeader title="Login" withBack={false} />
        <CustomText style={styles.title}>Welcome back to GetPayIn</CustomText>
        <View style={styles.content}>
          <BaseTextInput
            name="username"
            label="Username"
            control={control}
            rules={{
              required: "Username is required",
            }}
          />
          <BaseTextInput
            name="password"
            label="Password"
            control={control}
            isPassword
            rules={{ required: "Password is required" }}
          />
        </View>
        <BaseButton
          onPress={submitData}
          disabled={!isValid || isPending}
          loading={isPending}
        >
          Login
        </BaseButton>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  title: { fontSize: 18, fontWeight: "700" },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  content: { flex: 1, gap: 16, marginTop: 24 },
});
export default LoginScreen;
