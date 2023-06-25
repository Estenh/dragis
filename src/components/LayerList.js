import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import Layer from "./Layer";
import TableRowsIcon from "@mui/icons-material/TableRows";

function LayerList({
  layers,
  toggleVisibility,
  reorderLayers,
  selectLayer,
  selectedLayer,
  selectStyle,
}) {
  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = [...layers];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    reorderLayers(items);
  }

  function handleSelectedLayer(layername) {
    selectLayer(layername);
  }

  function handleVisibilityChange(layername) {
    toggleVisibility(layername);
  }

  function handleColorChange(event, layer) {
    selectStyle(layer, event.target.value);
  }

  return (
    <div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="layerlist">
          {(provided) => (
            <div
              className="layerlist"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <List dense={true}>
                {layers.map((layer, idx) => {
                  return (
                    <Draggable
                      key={layer.layername}
                      draggableId={layer.layername}
                      index={idx}
                    >
                      {(provided) => (
                        <ListItem
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <ListItemButton
                            selected={selectedLayer === layer.layername}
                            onClick={() => handleSelectedLayer(layer.layername)}
                            sx={{ ml: -2 }}
                          >
                            <ListItemIcon>
                              <Checkbox
                                edge="start"
                                checked={layer.visible}
                                onChange={() =>
                                  handleVisibilityChange(layer.layername)
                                }
                              />
                            </ListItemIcon>
                            <ListItemText
                              primary={layer.layername}
                              sx={{ ml: -3, pl: 0 }}
                            />
                            <input
                              type="color"
                              value={layer.style.color}
                              disabled={true}
                              onChange={(e) => handleColorChange(e, layer)}
                            />
                          </ListItemButton>
                          {/* <ListItemButton>
                            <ListItemIcon
                              onClick={() =>
                                handleSelectedLayer(layer.layername)
                              }
                            >
                              <TableRowsIcon />
                            </ListItemIcon>
                            <ListItemIcon>
                              <ColorLensIcon />
                            </ListItemIcon>
                          </ListItemButton> */}
                        </ListItem>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </List>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default LayerList;
