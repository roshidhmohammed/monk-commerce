export const removeProductOrVariant = ({
  allProducts,
  variantId,
  productId,
  emptyProdId,
  selectedProductsLength,
}) => {
  // Case 1: Remove empty product directly
  if (emptyProdId !== undefined) {
    return allProducts.filter((prod) => prod.id !== emptyProdId);
  }

  // Case 2: Removing the current products if only one variants exists
  if (selectedProductsLength === 1) {
    return allProducts.filter((prod) => prod.product?.id !== productId);
  }

  // Case 3: Removing the variants from the current product
  return allProducts
    .map((prod) => {
      if (prod.product?.id !== productId) return prod;

      const filteredVariants = prod.variants.filter(
        (variant) => variant.id !== variantId
      );

      return {
        ...prod,
        variants: filteredVariants,
      };
    })
    .filter((prod) => prod.variants.length > 0);
};
