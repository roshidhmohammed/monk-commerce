import ListTable from "./productTables/ProductLevelTable";
import Button from "../common/Button";
import { useDispatch, useSelector } from "react-redux";
// import { add } from "@dnd-kit/utilities";
import { addSelectedProduct } from "../utils/slices/selectedProductSlice";

const ProductList = () => {
  let selectedProducts = useSelector((state) => state.selectedProduct);
  const dispatch = useDispatch();

  const handleEmptyProducts = () => {
    if (selectedProducts == null) {
      let newlyAddedProduct = [
        { id: Date.now() + Math.random(), product: null, variants: [] },
      ];
      dispatch(addSelectedProduct(newlyAddedProduct));
    }
    let newlyAddedProduct = [
      ...selectedProducts,
      { id: Date.now() + Math.random(), product: null, variants: [] },
    ];
    dispatch(addSelectedProduct(newlyAddedProduct));
  };

  return (
    <div className=" mt-18.75  lg:px-60.25 px-5 w-full pb-20">
      <div>
        <h2 className="text-gray-300 font-semibold text-xl">Add Products</h2>
      </div>
      <div className="mt-5 w-full">
        <ListTable
          heading1={"Product"}
          heading2={"Discount"}
          selectedProducts={selectedProducts}
        />
      </div>
      <div className=" flex justify-end mr-10">
        <Button
          text="Add Product"
          onClick={handleEmptyProducts}
          className=" bg-white text-green border-green font-bold border px-5 py-3 rounded-md mt-5"
        />
      </div>
    </div>
  );
};

export default ProductList;
