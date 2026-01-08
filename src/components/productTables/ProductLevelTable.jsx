import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// MediaQuery for responsive
import { useMediaQuery } from "react-responsive";

// Redux Imports
import { useDispatch, useSelector } from "react-redux";
import { addSelectedProduct } from "../../utils/slices/selectedProductSlice";
import { editProduct } from "../../utils/slices/editProductSlice";

// Drag and Drop Imports
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

// components Imports
import Button from "../../common/Button";
import RowIcon from "../../common/icons/RowIcon";
import EditIcon from "../../common/icons/EditIcon";
import CloseIcon from "../../common/icons/CloseIcon";

// Helpers Function
import { onDragUpdateStyle } from "../../helpers/onDragUpdateStyle";
import { updateDiscountHelper } from "../../helpers/updateDiscount";
import { removeProductOrVariant } from "../../helpers/removeProductOrVariant";
import { reorderSelectedProducts } from "../../helpers/reorderSelectedProducts ";
import VariantsTableRow from "./VariantLevelTable";

const ProductLevelTable = ({ heading1, heading2, selectedProducts }) => {
  const [openVariantId, setopenVariantId] = useState(null);
  let allProducts = useSelector((state) => state.selectedProduct);

  const isMobile = useMediaQuery({ maxWidth: 700 });



  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!selectedProducts?.length) return null;

  // Activating the Discount applying input box
  const toggleDiscount = (type, id, product_id) => {
    const updatedProducts = updateDiscountHelper({
      allProducts,
      type,
      id,
      product_id,
      discountType: "% off",
      discountVal: 0,
    });

    dispatch(addSelectedProduct(updatedProducts));
  };

  // updating the discount number - eg:50%, 80, 100,...
  const handleDiscountValue = (id, value) => {
    const updatedProducts = updateDiscountHelper({
      allProducts,
      type: "product",
      id,
      product_id: null,
      discountType: null,
      discountVal: value,
    });

    dispatch(addSelectedProduct(updatedProducts));
  };

  // For handling the discount type - %off / flat
  const handleDiscountType = (id, discountType) => {
    const updatedProducts = updateDiscountHelper({
      allProducts,
      type: "product",
      id,
      product_id: null,
      discountType: discountType,
      discountVal: null,
    });

    dispatch(addSelectedProduct(updatedProducts));
  };

  // Removing the variants or product
  const handleRemove = (variantId, productId, emptyProdId) => {
    const updatedProducts = removeProductOrVariant({
      allProducts,
      variantId,
      productId,
      emptyProdId,
      selectedProductsLength: selectedProducts?.length,
    });

    dispatch(addSelectedProduct(updatedProducts));
  };

  // For handling the Edit/ replacing the product from the fetched product lists
  const handleEditProduct = (index, type, variantId, productId) => {
    dispatch(
      editProduct({
        index: index,
        type: type,
        variantId: variantId,
        prodId: productId,
      })
    );
    navigate("/add-products");
  };

  // Drag and Drop Handler for dropping the product or variant element
  const handleOnDragEnd = (result) => {
    const updatedProducts = reorderSelectedProducts({
      allProducts,
      result,
    });

    dispatch(addSelectedProduct(updatedProducts));
  };

  return (
    <div className={heading1?.trim() === "" ? "sm:pl-10 pl-1" : ""}>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <table className=" w-full border-collapse">
          <thead className="text-left">
            <tr>
              <th className="w-5"></th>
              <th >{heading1}</th>
              <th className="sm:w-60 ">{heading2}</th>
              <th className="w-5"></th>
            </tr>
          </thead>

          {/* Product Level Table's row */}
          {heading1 !== "" ? (
            <Droppable droppableId="products" type="PRODUCT">
              {(provided) => (
                <tbody ref={provided.innerRef} {...provided.droppableProps}>
                  {selectedProducts.map((data, index) => {
                    const isDiscountOpen =
                      data?.product?.discountValue !== undefined;
                    const isVariantOpen = openVariantId === data?.id;
                    const isEmpty = data?.product !== null;

                    return (
                      <Draggable
                        key={data?.product?.id}
                        draggableId={data?.product?.id?.toString()}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <React.Fragment>
                            <tr
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              style={onDragUpdateStyle(
                                provided.draggableProps.style,
                                snapshot
                              )}
                            >
                              <td {...provided.dragHandleProps}>
                                <RowIcon />
                              </td>

                              <td>
                                <div className="flex sm:gap-3 gap-1 items-center sm:mr-3 mr-1 my-2">
                                  <span>{index + 1}</span>

                                  <div className="flex justify-between items-center bg-gray-200 px-2 sm:py-1 sm:h-12 rounded w-full">
                                    <span className="">{data?.product?.title}</span>
                                    <EditIcon
                                      handleEditProduct={() =>
                                        handleEditProduct(
                                          index,
                                          "product",
                                          null,
                                          data?.product?.id
                                        )
                                      }
                                    />
                                  </div>
                                </div>
                              </td>

                              <td>
                                {isDiscountOpen ? (
                                  <div className="flex gap-2 items-center">
                                    <input
                                      type="number"
                                      min={0}
                                      max={100}
                                      value={data?.product?.discountValue ?? ""}
                                      onChange={(e) => {
                                        let value = Number(e.target.value);

                                        // Validation for limiting discount value
                                        if (value > 100) value = 100;
                                        if (value < 0) value = 0;

                                        handleDiscountValue(
                                          data?.product?.id,
                                          value
                                        );
                                      }}
                                      className="border  border-gray-100  px-2 rounded-md sm:w-30 sm:h-12 input-focus"
                                    />

                                    <select
                                      value={data?.product?.discountTypes}
                                      onChange={(e) =>
                                        handleDiscountType(
                                          data?.product?.id,
                                          e.target.value
                                        )
                                      }
                                      className="border border-gray-100 rounded-md sm:px-3 sm:py-2.5 input-focus sm:h-12 "
                                    >
                                      <option value="% off">% off</option>
                                      <option value="flat off">flat off</option>
                                    </select>
                                  </div>
                                ) : (
                                  isEmpty && (
                                    <Button
                                      text="Add Discount"
                                      onClick={() =>
                                        toggleDiscount(
                                          "product",
                                          data?.product?.id
                                        )
                                      }
                                      className="bg-green-100 sm:h-12 sm:w-57 text-white px-3.5 py-1 rounded-md "
                                    />
                                  )
                                )}
                              </td>

                              <td>
                                {data?.id && (
                                  <CloseIcon
                                    handleRemove={() =>
                                      handleRemove(
                                        null,
                                        data?.product?.id,
                                        data?.id
                                      )
                                    }
                                  />
                                )}
                              </td>
                            </tr>

                            {data?.variants?.length > 1 && (
                              <tr >
                                <td colSpan={isMobile ?3:2} >
                                  <div className="flex justify-end sm:mr-3">
                                    {isVariantOpen ? (
                                      <Button
                                        text="Hide Variants ˄"
                                        onClick={() => setopenVariantId(null)}
                                        className="btn-primary "
                                      />
                                    ) : (
                                      <Button
                                        text="Show Variants ˅"
                                        onClick={() =>
                                          setopenVariantId(data?.id)
                                        }
                                        className="btn-primary "
                                      />
                                    )}
                                  </div>
                                </td>
                              </tr>
                            )}

                            {(data?.variants?.length === 1 ||
                              (isVariantOpen &&
                                data?.variants?.length > 0)) && (
                              <tr>
                                <td colSpan={4}>
                                  {/* if variants exist for the the current product level- recursively call for the same component */}
                                  <ProductLevelTable
                                    heading1=""
                                    heading2=""
                                    selectedProducts={data?.variants}
                                  />
                                </td>
                              </tr>
                            )}
                          </React.Fragment>
                        )}
                      </Draggable>
                    );
                  })}

                  {provided.placeholder}
                </tbody>
              )}
            </Droppable>
          ) : (
            // Variant Level Table's Row
            <VariantsTableRow
              selectedProducts={selectedProducts}
              handleEditProduct={handleEditProduct}
              allProducts={allProducts}
              handleRemove={handleRemove}
            />
          )}
        </table>
      </DragDropContext>
    </div>
  );
};

export default ProductLevelTable;
