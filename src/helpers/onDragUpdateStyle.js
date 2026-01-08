// updating the product or variant level element while dragging starts
export const onDragUpdateStyle = (style, snapshot) => {
  if (!snapshot.isDragging) return style;
  if (!style?.transform) return style;

  return {
    ...style,
    transform: style.transform.replace(/\((.*?),(.*?)\)/, "(0px, $2)"),
  };
};
