import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetchProducts from "../hooks/useFetchProducts";
import selectProductClose from "../assets/icons/select-prod-close.svg";
import { handleCancel } from "../helpers/SelectProductCancel";
import { useDispatch, useSelector } from "react-redux";
import { addSelectedProduct } from "../utils/slices/selectedProductSlice";
import { getOptimizedImageUrl } from "../helpers/getOptimizedImageUrl";
import Button from "../common/Button";

const ProductSelector = () => {
  const navigate = useNavigate();
  let editproduct = useSelector((state) => state.editProduct);
  let allProducts = useSelector((state) => state.selectedProduct);
  const [filteredFetchProducts, setFilteredFetchProducts] = useState();

  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [selectedProducts, setSelectedProducts] = useState([]);
  // const [loading, setLoading] = useState(false); // Removed local loading state
  const endPage = useRef(null);
  const dispatch = useDispatch();

  const {
    products,
    loading: productsLoading,
    hasMore,
  } = useFetchProducts({
    searchTerm,
    page,
  });

  const filterProducts = (products) => {
    // If nothing is selected → return original list
    if (!allProducts || !Array.isArray(allProducts) || !editproduct) {
      setFilteredFetchProducts(products);
      return;
    }

    // Collect all selected variant IDs
    const selectedVariantIds = allProducts
      .flatMap((p) => p?.variants ?? [])
      .map((v) => v?.id);

    // Build new product list
    const filtered = products
      .map((product) => {
        // Filter variants NOT already selected
        const remainingVariants = product?.variants?.filter(
          (v) => !selectedVariantIds.includes(v.id)
        );

        // If no variants remain → remove product
        if (!remainingVariants?.length) return null;

        // Otherwise return product with remaining variants
        return {
          ...product,
          variants: remainingVariants,
        };
      })
      .filter(Boolean); // remove nulls

    setFilteredFetchProducts(filtered);
  };

  useEffect(() => {
    filterProducts(products);
  }, [products, editproduct, selectedProducts]);

  const addToSelectedProduct = (variant, product) => {
    setSelectedProducts((prev) => {
      // check if product already exists
      const productIndex = prev.findIndex(
        (item) => item.product?.id === product.id
      );

      // PRODUCT NOT ADDED YET → add product + variant
      if (productIndex === -1) {
        return [
          ...prev,
          {
            product,
            variants: [variant],
          },
        ];
      }

      // PRODUCT EXISTS → check if variant exists
      const productItem = prev[productIndex];
      const variantExists = productItem.variants.some(
        (v) => v.id === variant.id
      );

      // If variant exists → remove it
      if (variantExists) {
        const updatedVariants = productItem.variants.filter(
          (v) => v.id !== variant.id
        );

        // If no variants left → remove product entry
        if (updatedVariants.length === 0) {
          return prev.filter((_, i) => i !== productIndex);
        }

        // Otherwise update variants
        const updated = [...prev];
        updated[productIndex] = {
          ...productItem,
          variants: updatedVariants,
        };
        return updated;
      }

      // Variant not exists → add it
      const updated = [...prev];
      updated[productIndex] = {
        ...productItem,
        variants: [...productItem.variants, variant],
      };
      return updated;
    });
  };

  const handleScroll = () => {
    if (
      !productsLoading &&
      hasMore &&
      endPage?.current?.scrollTop + endPage?.current?.clientHeight >=
        endPage?.current?.scrollHeight - 20
    ) {
      setPage((prev) => prev + 1);
    }
  };

  const isVariantSelected = (variantId) => {
    return selectedProducts?.some((selected) =>
      selected?.variants?.some((v) => v?.id === variantId)
    );
  };

  const isProductSelected = (productId) => {
    return selectedProducts.some(
      (item) => item.product?.id === productId && item.variants.length > 0
    );
  };

  const handleSelectedProducts = () => {
    if (selectedProducts.length === 0) return;
    let replacingIndex =
      editproduct?.type === "empty" || editproduct?.type === "product"
        ? editproduct?.index
        : null;
    if (editproduct[2] !== null) {
      replacingIndex = allProducts.findIndex(
        (prod) => prod.product?.id === editproduct?.prodId
      );
    }
    let swappedProducts = [...allProducts];
    swappedProducts[replacingIndex] = selectedProducts[0];
    const mergedProducts = [
      ...swappedProducts,
      ...selectedProducts.slice(1, selectedProducts.length),
    ];
    dispatch(addSelectedProduct(mergedProducts));
    navigate("/");
  };
  console.log(selectedProducts);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-187.5 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h2 className="text-lg font-medium">Select Products</h2>
          <button
            className="text-gray-500 hover:text-black text-xl leading-none cursor-pointer"
            onClick={() => handleCancel(navigate)}
          >
            <img src={selectProductClose} alt="" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-gray-100">
          <input
            type="search"
            placeholder="Search product"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border rounded-md px-3 border-gray-100 py-2 text-sm focus:ring-2 focus:ring-gray-300 outline-none"
          />
        </div>

        {/* Scrollable List */}
        <div
          className="overflow-y-auto flex-1 "
          ref={endPage}
          onScroll={handleScroll}
        >
          {filteredFetchProducts?.map((product, index) => (
            <div key={product.id + product?.title + index}>
              <div className="flex items-center hover:bg-gray-200  gap-3 px-4 py-3 border-b border-gray-100">
                <input
                  type="checkbox"
                  checked={isProductSelected(product.id)}
                  readOnly
                  className="w-6 h-6 appearance-none border  border-gray-400 rounded bg-white grid place-content-center text-white checked:bg-green-100 checked:border-green-100"
                />
                <img
                  src={getOptimizedImageUrl(product?.image?.src)}
                  alt="product image"
                  className="w-10 h-10 rounded-md object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <span className="font-normal text-lg">{product.title}</span>
              </div>
              {product.variants.map((variant, index) => (
                // (variant.inventory_quantity > 0 && variant.inventory_quantity !== undefined) && (
                <div
                  key={variant.id + variant?.title + index}
                  className="flex items-center text-gray-400 hover:bg-gray-200 text-lg justify-start gap-4 px-4 pl-14 py-3 border-b border-gray-100"
                >
                  <input
                    type="checkbox"
                    onChange={() => addToSelectedProduct(variant, product)}
                    checked={isVariantSelected(variant?.id)}
                    className="w-6 h-6 mr-3 appearance-none border hover:cursor-pointer border-gray-400 rounded bg-white grid place-content-center text-white checked:bg-green-100 checked:border-green-100"
                  />

                  <div className="flex-1">{variant.title}</div>

                  <div className=" mr-10 text-center">
                    {variant.inventory_quantity < 0 ||
                    variant.inventory_quantity === undefined
                      ? 0
                      : variant.inventory_quantity}{" "}
                    available
                  </div>

                  <div className="font-medium w-10 text-center">
                    {variant.price}
                  </div>
                </div>
                // )
              ))}
            </div>
          ))}

          {productsLoading && (
            <div className="flex justify-center my-4">
              <div className="loader ease-linear rounded-full border-4 border-t-4 border-green-100 h-8 w-8"></div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 border-t border-gray-100">
          <span className="text-sm text-gray-600">
            {selectedProducts?.length} product selected
          </span>

          <div className="flex gap-2">
            <Button
              text="Cancel"
              onClick={() => handleCancel(navigate)}
              className="px-4 py-2 border rounded-md cursor-pointer"
            />
            {/* <button
              className="px-4 py-2 border rounded-md cursor-pointer"
              onClick={() => handleCancel(navigate)}
            >
              Cancel
            </button> */}

            <Button
              text="Add"
              onClick={() => handleSelectedProducts()}
              className="px-5 py-2 bg-green-100 text-white rounded-md cursor-pointer"
            />

            {/* <button
              className="px-5 py-2 bg-green-100 text-white rounded-md cursor-pointer"
              onClick={handleSelectedProducts}
            >
              Add
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSelector;
