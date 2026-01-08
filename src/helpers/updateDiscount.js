// Discount type and Discount value updating
export const updateDiscountHelper = ({
  allProducts,
  type,
  id,
  product_id,
  discountType,
  discountVal,
}) => {
  return allProducts.map((prod) => {
    if (type === "product" && prod?.product?.id === id) {
      return {
        ...prod,
        product: {
          ...prod.product,
          discountTypes: discountType ?? prod.product.discountTypes,
          discountValue: discountVal ?? prod.product.discountValue,
        },
      };
    }

    return prod;
  });
};
