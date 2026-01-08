import { onDragUpdateStyle } from "../../helpers/onDragUpdateStyle";
import CloseIcon from "../icons/CloseIcon";
import EditIcon from "../icons/EditIcon";
import RowIcon from "../icons/RowIcon";

// Drag and Drop Imports
import { Droppable, Draggable } from "@hello-pangea/dnd";

const VariantLevelTable = ({
  selectedProducts,
  handleEditProduct,
  allProducts,
  handleRemove,
}) => {
  return (
    <Droppable
      droppableId={`variants-${selectedProducts[0]?.product_id}`}
      type="VARIANT"
    >
      {(provided) => (
        <tbody ref={provided.innerRef} {...provided.droppableProps}>
          {selectedProducts.map((data, index) => {
            return (
              <Draggable
                key={data?.id}
                draggableId={data?.id?.toString()}
                index={index}
              >
                {(provided, snapshot) => (
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
                      <div className="flex gap-3 items-center mr-3 my-2">
                        <div className="flex justify-between items-center bg-gray-200 px-2 py-1 rounded w-full">
                          <span>{data?.title}</span>

                          <EditIcon
                            handleEditProduct={() =>
                              handleEditProduct(
                                index,
                                "variant",
                                data?.id,
                                data?.product_id
                              )
                            }
                          />
                        </div>
                      </div>
                    </td>

                    <td></td>

                    <td>
                      {allProducts?.length > 1 && (
                        <CloseIcon
                          handleRemoved={() =>
                            handleRemove(data?.id, data?.product_id)
                          }
                        />
                      )}
                    </td>
                  </tr>
                )}
              </Draggable>
            );
          })}

          {provided.placeholder}
        </tbody>
      )}
    </Droppable>
  );
};

export default VariantLevelTable;
