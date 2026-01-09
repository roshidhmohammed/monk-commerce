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

  // Case 2: Remove entire product if only one variant exists
  if (selectedProductsLength === 1) {
    return allProducts.filter((prod) => prod.product?.id !== productId);
  }

  // Case 3: Remove only the variant (KEEP empty product)
  return allProducts.map((prod) => {
    if (prod.product?.id !== productId) return prod;

    return {
      ...prod,
      variants: prod.variants.filter(
        (variant) => variant.id !== variantId
      ),
    };
  });
};
