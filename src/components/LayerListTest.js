import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Layer from "./Layer";

function LayerListTest({ layers, toggleVisibility }) {
  return (
    <List>
      <ListItem>
        <ListItemButton>
          <ListItemText primary={layer.layername} />
        </ListItemButton>
      </ListItem>
      ))}
    </List>
  );
}

export default LayerListTest;
