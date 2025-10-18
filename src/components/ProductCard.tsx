import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { deleteProduct, IProduct } from "@/network/products";
import CustomText from "./CustomText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useAppSelector } from "@/services/redux";
import { useMutation } from "@tanstack/react-query";
import Loading from "./Loading";
import { errorToast, successToast } from "@/helpers/ustil";
import { useResetTimer } from "@/context/AutoLogoutProvider";

interface IProductCard {
  product: IProduct;
  showDelete?: boolean;
}
const ProductCard = ({ product, showDelete = false }: IProductCard) => {
  const resetTimer = useResetTimer();
  const [isProductDelete, setIsdProductDeleted] = useState(false);
  const { thumbnail, title } = product;
  const { user } = useAppSelector((state) => state.user);
  const themeColors = useThemeColor();
  const { mutate, isPending } = useMutation({
    mutationKey: ["delete-product"],
    mutationFn: () => deleteProduct(product.id),
    onSuccess: (res) => {
      setIsdProductDeleted(true);
      successToast("Product deleted successfully");
    },
    onError: (err) => errorToast(err.message || "Something went wrong"),
  });
  function handleDeleteProduct() {
    resetTimer();
    mutate();
  }

  if (isProductDelete) return null;
  return (
    <View
      style={[
        styles.card,
        {
          borderColor: themeColors.borderColor,
          backgroundColor: themeColors.background,
        },
      ]}
    >
      <Image src={thumbnail} style={styles.thumbnail} resizeMode="contain" />
      <CustomText numberOfLines={2} ellipsizeMode="tail" style={styles.title}>
        {title}
      </CustomText>

      {user?.isAdmin && showDelete && (
        <TouchableOpacity
          style={styles.delete}
          onPress={handleDeleteProduct}
          disabled={isPending}
        >
          <Loading loading={isPending}>
            <CustomText style={{ color: themeColors.error }}>Delete</CustomText>
          </Loading>
        </TouchableOpacity>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 12,
    overflow: "hidden",
    margin: 5,
    padding: 10,
  },
  thumbnail: { width: "100%", aspectRatio: 1 },
  title: { fontSize: 16, fontWeight: 600 },
  delete: { alignSelf: "flex-end", marginTop: "auto", height: 30 },
});
export default ProductCard;
