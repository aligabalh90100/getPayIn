import { FlatList, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../routes";
import ScreenHeader from "@/components/Header/ScreenHeader";
import { useQuery } from "@tanstack/react-query";
import { getAllProductsByCategory, IProduct } from "@/network/products";
import Loading from "@/components/Loading";
import ProductCard from "@/components/ProductCard";
import ScreenContainer from "@/components/ScreenContainer";
import FlatListHeader from "@/components/FlatListHeader";
import { useAppSelector } from "@/services/redux";
import { mmkvGetValue, mmkvSetValue } from "@/services/mmkvStorage";

type Props = NativeStackScreenProps<RootStackParamList, "ProductsByCategory">;
const ProductsByCategoryScreen = ({ route }: Props) => {
  const { category, name } = route.params;
  const cached = mmkvGetValue("productsByCategory");
  const { networkConnected } = useAppSelector((state) => state.settings);
  const [productsList, setProductsList] = useState<IProduct[]>(() =>
    cached ? JSON.parse(cached) : []
  );
  const { isLoading, data, refetch, isRefetching } = useQuery({
    queryKey: [`products-category-${name}`],
    queryFn: () => getAllProductsByCategory(category),
    select: (res) => res.products,
    enabled: networkConnected,
  });
  useEffect(() => {
    if (!productsList.length && networkConnected && data) {
      setProductsList(data);
      mmkvSetValue("productsByCategory", JSON.stringify(data));
    }
  }, [data, networkConnected, productsList]);
  return (
    <ScreenContainer>
      <ScreenHeader title={name} withBack />
      <Loading loading={isLoading && networkConnected}>
        <FlatList
          contentContainerStyle={{ paddingBottom: 20 }}
          data={productsList}
          renderItem={({ item }) => <ProductCard product={item} />}
          keyExtractor={(i) => i.id.toString()}
          refreshControl={
            <RefreshControl
              refreshing={Boolean(data && isLoading)}
              onRefresh={refetch}
            />
          }
          ListHeaderComponent={() => <FlatListHeader title="Products List" />}
          numColumns={2}
          refreshing={isRefetching}
          onRefresh={refetch}
        />
      </Loading>
    </ScreenContainer>
  );
};

export default ProductsByCategoryScreen;
