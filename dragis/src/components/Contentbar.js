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
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import LayerList from "./LayerList";
import DeleteDialog from "./DeleteDialog";
import ColorDialog from "./ColorDialog";

const drawerWidth = 240;

function Contentbar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [colorDialogOpen, setColorDialogOpen] = React.useState(false);
  const [style, setStyle] = React.useState(null);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

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
    <div>
      <Toolbar />
      <Divider />
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Button component="label" variant="outlined" endIcon={<AddIcon />}>
        Add data
        <input type="file" hidden onChange={handleLayerAdd} value="" />
      </Button>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Responsive drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
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
          <Toolbar />
          <Divider />
          <LayerList
            layers={props.layers}
            reorderLayers={props.reorderLayers}
            toggleVisibility={props.toggleVisibility}
            selectLayer={props.selectLayer}
            selectedLayer={props.selectedLayer}
            selectStyle={props.selectStyle}
          />
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
          {/* {drawer} */}
          <Toolbar>
            <Stack direction="row" spacing={1} sx={{ ml: -2 }}>
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
              />
              <Tooltip title="Change styling">
                <IconButton size="small" onClick={handleOpenCloseColorDialog}>
                  <ColorLensIcon />
                </IconButton>
              </Tooltip>
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
        </Drawer>
      </Box>
    </Box>
  );
}

export default Contentbar;
