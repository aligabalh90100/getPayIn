import {
  createNavigationContainerRef,
  NavigationContainer,
} from "@react-navigation/native";
import AuthNavigator from "./authNavigator";
import { StatusBar } from "react-native";
import { useAppSelector } from "@/services/redux";
import AppStackNavigator from "./appStackNavigator";
import useNetworkStatus from "@/hooks/useNetworkStatus";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "./screens/SplashScreen";
import { AutoLogoutProvider } from "@/context/AutoLogoutProvider";

const navigationRef = createNavigationContainerRef();
const Stack = createNativeStackNavigator();
const RootNavigator = () => {
  useNetworkStatus();
  const { theme } = useAppSelector((state) => state.settings);
  StatusBar.setBarStyle(theme === "light" ? "dark-content" : "light-content");

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Auth" component={AuthNavigator} />
        <Stack.Screen name="App" component={AppStackNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;

// type RootStackParamList = StaticParamList<typeof Stack>;

// declare global {
//   namespace ReactNavigation {
//     interface RootParamList extends RootStackParamList {}
//   }
// }
