import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";
import Layer from "./Layer";
import MailIcon from "@mui/icons-material/Mail";

function LayerList({ layers, toggleVisibility, reorderLayers }) {
  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = [...layers];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    reorderLayers(items);
  }

  function handleVisibilityChange(layername) {
    toggleVisibility(layername);
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
              <List>
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
                          <ListItemButton>
                            <ListItemIcon>
                              <Checkbox
                                edge="start"
                                checked={layer.visible}
                                onChange={() =>
                                  handleVisibilityChange(layer.layername)
                                }
                              />
                            </ListItemIcon>
                            <ListItemText primary={layer.layername} />
                          </ListItemButton>
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
