import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import BuildIcon from "@mui/icons-material/Build";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Tooltip } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import Bbox from "./Bbox";
import Intersect from "./Intersect";
import Buffer from "./Buffer";
import Union from "./Union";
import Dissolve from "./Dissolve";
import Area from "./Area";
import Difference from "./Difference";

/**
 * The sidebar where all det geo tools are located.
 * The tools are rendered according to the the state
 * passed down from it's parent.
 */

const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

function MuiToolbar({
  layers,
  addLayers,
  handleDrawerClose,
  handleToolSelect,
  tool,
  open,
}) {
  const theme = useTheme();

  const toolDescriptions = {
    Area: "The Area tool calculates the surface area of a given geometry or shape.",
    Bbox: "The Bbox tool generates a bounding box that completely surrounds the selected geometry.",
    Buffer:
      "The Buffer tool creates a buffer zone of a specified distance around a geometry.",
    Difference:
      "The Difference tool subtracts one geometry from another, leaving the difference.",
    Dissolve:
      "The Dissolve tool merges adjacent polygons into a single polygon.",
    Intersect:
      "The Intersect tool finds the common area where two geometries overlap.",
    Union:
      "The Union tool combines multiple geometries into one, keeping all the areas.",
  };

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
        },
      }}
      variant="persistent"
      anchor="right"
      open={open}
    >
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
        <Typography variant="h5">Tools</Typography>
      </DrawerHeader>
      <Divider />
      <List>
        {[
          "Area",
          "Bbox",
          "Buffer",
          "Difference",
          "Dissolve",
          "Intersect",
          "Union",
        ].map((text, index) => (
          <ListItem key={text} disablePadding>
            <Tooltip
              title={
                <Typography variant="body2" style={{ whiteSpace: "pre-line" }}>
                  {toolDescriptions[text]}
                </Typography>
              }
              placement="left"
            >
              <ListItemButton onClick={() => handleToolSelect(text)}>
                <ListItemText primary={text} />
              </ListItemButton>
            </Tooltip>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Typography variant="h6" align="center" noWrap>
        {tool}
      </Typography>
      {tool === "Bbox" ? (
        <Bbox layers={layers} tool={tool} addLayers={addLayers} />
      ) : tool === "Intersect" ? (
        <Intersect layers={layers} tool={tool} addLayers={addLayers} />
      ) : tool === "Buffer" ? (
        <Buffer layers={layers} tool={tool} addLayers={addLayers} />
      ) : tool === "Union" ? (
        <Union layers={layers} tool={tool} addLayers={addLayers} />
      ) : tool === "Dissolve" ? (
        <Dissolve layers={layers} tool={tool} addLayers={addLayers} />
      ) : tool === "Area" ? (
        <Area layers={layers} tool={tool} />
      ) : tool === "Difference" ? (
        <Difference layers={layers} tool={tool} addLayers={addLayers} />
      ) : null}
    </Drawer>
  );
}

export default MuiToolbar;
