export const reorderSelectedProducts = ({ allProducts, result }) => {
  const { source, destination, type } = result;

  if (!destination) return allProducts;

  //  Product Level Reordering
  if (type === "PRODUCT") {
    const reordered = Array.from(allProducts);
    const [moved] = reordered.splice(source.index, 1);
    reordered.splice(destination.index, 0, moved);

    return reordered;
  }

  //   Variant Level Reordering
  if (type === "VARIANT") {
    const sourceProductId = Number(source.droppableId.replace("variants-", ""));
    const destProductId = Number(
      destination.droppableId.replace("variants-", "")
    );

    // Prevent cross-product dragging
    if (sourceProductId !== destProductId) return allProducts;

    return allProducts.map((prod) => {
      if (prod.product.id !== sourceProductId) return prod;

      const variants = Array.from(prod.variants);
      const [movedVariant] = variants.splice(source.index, 1);
      variants.splice(destination.index, 0, movedVariant);

      return {
        ...prod,
        variants,
      };
    });
  }

  return allProducts;
};
