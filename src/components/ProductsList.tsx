import {
  View,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getAllProducts, IProduct } from "@/network/products";
import ProductCard from "./ProductCard";
import Loading from "./Loading";
import FlatListHeader from "./FlatListHeader";
import { useAppSelector } from "@/services/redux";
import { mmkvGetValue, mmkvSetValue } from "@/services/mmkvStorage";
import { useResetTimer } from "@/context/AutoLogoutProvider";

const HomeProducts = () => {
  const cached = mmkvGetValue("allProductsList");
  const resetTimer = useResetTimer();
  const { networkConnected } = useAppSelector((state) => state.settings);
  const [productsList, setProductsList] = useState<IProduct[]>(() =>
    cached ? JSON.parse(cached) : []
  );
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    refetch,
    isRefetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["all-products"],
    queryFn: async ({ pageParam }) => {
      return getAllProducts(pageParam);
    },
    getNextPageParam: (res) => {
      const currentPage = res.skip;
      const lastPage = res.total;

      return currentPage < lastPage ? currentPage + 20 : undefined;
    },
    initialPageParam: 0,
    enabled: networkConnected,
  });

  const renderFooter = () => {
    if (!isFetchingNextPage) return null;
    return (
      <View style={{ marginVertical: 20, justifyContent: "center" }}>
        <ActivityIndicator color={"red"} />
      </View>
    );
  };
  useEffect(() => {
    if (networkConnected && data) {
      const newProducts = data.pages.flatMap((page) => page.products) ?? [];
      if (newProducts.length > productsList.length) {
        setProductsList(newProducts);
        mmkvSetValue("allProductsList", JSON.stringify(newProducts));
      }
    }
  }, [data, networkConnected]);

  return (
    <Loading loading={isLoading && networkConnected && !cached}>
      <FlatList
        onScroll={resetTimer}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
        data={productsList}
        renderItem={({ item }) => <ProductCard showDelete product={item} />}
        keyExtractor={(i) => i.id.toString()}
        refreshControl={
          networkConnected ? (
            <RefreshControl
              refreshing={Boolean(data && isLoading)}
              onRefresh={refetch}
            />
          ) : undefined
        }
        ListHeaderComponent={() => <FlatListHeader title="Products List" />}
        numColumns={2}
        ListFooterComponent={renderFooter}
        onEndReached={() => hasNextPage && networkConnected && fetchNextPage()}
        onEndReachedThreshold={0.4}
        refreshing={isRefetching}
        onRefresh={networkConnected ? refetch : undefined}
      />
    </Loading>
  );
};

export default HomeProducts;
