import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import TableRowsIcon from "@mui/icons-material/TableRows";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import LayerList from "./LayerList";
import DeleteDialog from "./DeleteDialog";
import ColorDialog from "./ColorDialog";

const drawerWidth = 240;

function Contentbar(props) {
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [colorDialogOpen, setColorDialogOpen] = React.useState(false);

  const handleOpenAttributeTable = () => {
    props.openAttributeTable();
  };

  function handleOpenCloseDeleteDialog() {
    setDeleteDialogOpen(!deleteDialogOpen);
  }
  function handleOpenCloseColorDialog() {
    setColorDialogOpen(!colorDialogOpen);
  }

  const handleDeleteLayer = () => {
    props.deleteLayer(props.selectedLayer);
  };
  const handleSelectStyle = (layer, color, weight, fillOpacity) => {
    props.selectStyle(layer, color, weight, fillOpacity);
  };

  const handleLayerAdd = (e) => {
    const layerFile = e.target.files[0];
    const reader = new FileReader();
    reader.readAsText(layerFile);
    reader.onload = function (e) {
      let jsonLayer = JSON.parse(reader.result);
      jsonLayer.layername = layerFile.name.slice(0, -5);
      props.addLayers(jsonLayer);
    };
  };

  const drawer = (
    <>
      <Toolbar>
        <Stack
          direction="row"
          spacing={props.mobileOpen ? 0 : 1}
          sx={{ ml: -2 }}
        >
          <Typography variant="h6">Contents</Typography>
          <Tooltip title="Open attribute table">
            <IconButton size="small" onClick={handleOpenAttributeTable}>
              <TableRowsIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete item">
            <IconButton size="small" onClick={handleOpenCloseDeleteDialog}>
              <DeleteForeverIcon />
            </IconButton>
          </Tooltip>
          <DeleteDialog
            deleteDialogOpen={deleteDialogOpen}
            handleDeleteLayer={handleDeleteLayer}
            handleOpenCloseDeleteDialog={handleOpenCloseDeleteDialog}
            selectedLayer={props.selectedLayer}
          />
          <Tooltip title="Change styling">
            <IconButton size="small" onClick={handleOpenCloseColorDialog}>
              <ColorLensIcon />
            </IconButton>
          </Tooltip>
          {props.mobileOpen && (
            <IconButton onClick={props.handleDrawerToggle}>
              <ChevronLeftIcon />
            </IconButton>
          )}
          {props.selectedLayer && (
            <ColorDialog
              colorDialogOpen={colorDialogOpen}
              handleOpenCloseColorDialog={handleOpenCloseColorDialog}
              handleSelectStyle={handleSelectStyle}
              selectedLayer={props.selectedLayer}
              layers={props.layers}
            />
          )}
        </Stack>
      </Toolbar>
      <Divider />
      <LayerList
        layers={props.layers}
        reorderLayers={props.reorderLayers}
        toggleVisibility={props.toggleVisibility}
        selectLayer={props.selectLayer}
        selectedLayer={props.selectedLayer}
        selectStyle={props.selectStyle}
      />
      <Button
        component="label"
        variant="contained"
        endIcon={<AddIcon />}
        sx={{ marginTop: "auto", marginBottom: 2 }}
      >
        Add data
        <input type="file" hidden onChange={handleLayerAdd} value="" />
      </Button>
    </>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="content sidebar"
    >
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Drawer
        variant="temporary"
        open={props.mobileOpen}
        onClose={props.handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
}

export default Contentbar;
