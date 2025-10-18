import { TouchableOpacity } from "react-native";
import React from "react";
import { IProductCategory } from "@/network/products";
import CustomText from "./CustomText";
import useAppNavigation from "@/navigation/routes";
import { useThemeColor } from "@/hooks/useThemeColor";

const CategoryItem = ({ name, slug, url }: IProductCategory) => {
  const { navigate } = useAppNavigation();
  const themeColors = useThemeColor();
  function handleCategoryPress() {
    navigate("ProductsByCategory", { category: url, name });
  }
  return (
    <TouchableOpacity
      onPress={handleCategoryPress}
      key={slug}
      style={{
        borderWidth: 1,
        borderRadius: 8,
        borderColor: themeColors.borderColor,
        height: 50,
        paddingHorizontal: 20,
        justifyContent: "center",
      }}
    >
      <CustomText>{name}</CustomText>
    </TouchableOpacity>
  );
};

export default CategoryItem;
