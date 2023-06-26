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

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

function MuiToolbar({ layers, addLayers }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [tool, setTool] = React.useState(null);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setTool(null);
  };

  const handleToolSelect = (tool) => {
    setTool(tool);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <Typography
            variant="h4"
            align="center"
            noWrap
            sx={{ flexGrow: 1 }}
            component="div"
          >
            DraGIS
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            sx={{ ...(open && { display: "none" }) }}
          >
            <BuildIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
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
              <ListItemButton onClick={() => handleToolSelect(text)}>
                <ListItemText primary={text} />
              </ListItemButton>
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
    </Box>
  );
}

export default MuiToolbar;
