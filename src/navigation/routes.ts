import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export interface IProductByCategoryParams {
  category: string;
  name: string;
}
export type RootStackParamList = {
  Login: undefined;
  Products: undefined;
  ProductsByCategory: IProductByCategoryParams;
  Tabs: undefined;
  App: undefined;
  Splash: undefined;
  Auth: undefined;
};

export type RootNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function useAppNavigation() {
  return useNavigation<RootNavigationProp>();
}
