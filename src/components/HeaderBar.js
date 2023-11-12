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
import MenuIcon from "@mui/icons-material/Menu";
import ModeNightIcon from "@mui/icons-material/ModeNight";
import LightModeIcon from "@mui/icons-material/LightMode";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MuiToolbar from "./MuiToolbar";
import Contentbar from "./Contentbar";

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

function HeaderBar(props) {
  const [open, setOpen] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [tool, setTool] = React.useState(null);

  const handleToolSelect = (tool) => {
    setTool(tool);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    //pass down
    setOpen(false);
    setTool(null);
  };

  const handleContentToggle = () => {
    setMobileOpen(!mobileOpen);
    console.log("hei");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleContentToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h4"
            align="center"
            noWrap
            sx={{ flexGrow: 1 }}
            component="div"
          >
            DraGIS
          </Typography>
          <IconButton onClick={props.toggleDarkMode}>
            {props.darkMode ? <LightModeIcon /> : <ModeNightIcon />}
          </IconButton>
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
      <Contentbar
        layers={props.layers}
        addLayers={props.addLayers}
        reorderLayers={props.reorderLayers}
        toggleVisibility={props.toggleVisibility}
        openAttributeTable={props.openAttributeTable}
        selectLayer={props.selectLayer}
        selectedLayer={props.selectedLayer}
        selectStyle={props.selectStyle}
        deleteLayer={props.deleteLayer}
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleContentToggle}
      />
      <MuiToolbar
        layers={props.layers}
        addLayers={props.addLayers}
        handleDrawerClose={handleDrawerClose}
        handleToolSelect={handleToolSelect}
        tool={tool}
        open={open}
      />
    </Box>
  );
}

export default HeaderBar;
