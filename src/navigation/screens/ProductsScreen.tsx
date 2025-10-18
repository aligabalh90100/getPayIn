import {
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import CustomText from "@/components/CustomText";
import ScreenHeader from "@/components/Header/ScreenHeader";
import { useAppDispatch, useAppSelector } from "@/services/redux";
import { MaterialIcons } from "@expo/vector-icons";
import { toggleTheme } from "@/services/redux/settingSlice";
import { Colors } from "@/constants/Colors";
import ProductsList from "@/components/ProductsList";
import { useQuery } from "@tanstack/react-query";
import { getAllProductsCategories, IProductCategory } from "@/network/products";
import CategoryItem from "@/components/CategoryItem";
import Loading from "@/components/Loading";
import InternetError from "@/components/InternetError";
import { mmkvGetValue, mmkvSetValue } from "@/services/mmkvStorage";
import { useResetTimer } from "@/context/AutoLogoutProvider";

const ProductsScreen = () => {
  const cached = mmkvGetValue("categories");
  const resetTimer = useResetTimer();
  const { networkConnected } = useAppSelector((state) => state.settings);
  const [categoryList, setCategoryList] = useState<IProductCategory[]>(() =>
    cached ? JSON.parse(cached) : []
  );
  const { user } = useAppSelector((state) => state.user);
  const { theme } = useAppSelector((state) => state.settings);
  const dispatch = useAppDispatch();
  const { isLoading, data } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllProductsCategories,
    enabled: networkConnected || !cached,
  });

  useEffect(() => {
    if (!categoryList.length && networkConnected && data) {
      setCategoryList(data);
      mmkvSetValue("categories", JSON.stringify(data));
    }
  }, [data, networkConnected, categoryList]);
  return (
    <View style={{ gap: 15, flex: 1 }}>
      <ScreenHeader withBack={false} style={styles.header}>
        <Image
          src={user?.image}
          style={styles.headerImage}
          resizeMode="contain"
        />
        <CustomText style={styles.headerText}>
          Welcome{" "}
          <CustomText style={[styles.headerText, styles.userName]}>
            {user?.firstName} {user?.lastName}
          </CustomText>
        </CustomText>
        <TouchableOpacity
          onPress={() => {
            resetTimer();
            dispatch(toggleTheme());
          }}
          style={styles.headerButton}
        >
          <MaterialIcons
            name={theme === "light" ? "dark-mode" : "light-mode"}
            color={Colors[theme].text}
            size={20}
          />
        </TouchableOpacity>
      </ScreenHeader>
      {!networkConnected && <InternetError />}
      <Loading loading={isLoading && networkConnected} style={{ height: 60 }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
          style={{ height: 80 }}
          onScroll={resetTimer}
        >
          {categoryList?.map((category) => (
            <CategoryItem key={category.slug} {...category} />
          ))}
        </ScrollView>
      </Loading>
      <ProductsList />
    </View>
  );
};

const styles = StyleSheet.create({
  header: { justifyContent: "flex-start", gap: 10, paddingHorizontal: 20 },
  headerImage: { width: 40, height: 40 },
  categoriesContainer: { gap: 10, paddingHorizontal: 20 },
  headerText: { fontSize: 14, fontWeight: 500 },
  headerButton: {
    height: "100%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "auto",
  },
  userName: { fontWeight: 600 },
});

export default ProductsScreen;
