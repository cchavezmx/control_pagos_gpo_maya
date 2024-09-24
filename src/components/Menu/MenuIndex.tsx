import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Toolbar,
  Typography,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import AssessmentIcon from "@mui/icons-material/Assessment";
import LogoutIcon from "@mui/icons-material/Logout";
import { Fragment, useState } from "react";
import ModalSettings from "../../Modales/ModalSettings";
import NewProject from "../../Modales/NewProject/NewProject";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/mutations";

function MenuIndex() {
  const [openSettingsModal, setOpenSettingsModal] = useState(false);
  const [openNewProjectModal, setOpenNewProjectModal] = useState(false);
  const navigate = useNavigate();

  const menus = [
    {
      key: Math.floor(Math.random() * 1000),
      title: "Configuración",
      icon: <SettingsIcon />,
      onClick: () => setOpenSettingsModal(!openSettingsModal),
    },
    {
      key: Math.floor(Math.random() * 1000),
      title: "Nuevo proyecto",
      icon: <CreateNewFolderIcon />,
      onClick: () => setOpenNewProjectModal(!openNewProjectModal),
    },
    {
      key: Math.floor(Math.random() * 1000),
      title: "Clientes",
      icon: <ContentPasteSearchIcon />,
      onClick: () => navigate("/search/clientes"),
    },
    {
      key: Math.floor(Math.random() * 1000),
      title: "Usuarios morosos",
      icon: <NewReleasesIcon />,
      onClick: () => navigate("/morosos"),
      color: "#f44336",
    },
  ];

  const drawer = (
    <Fragment>
      <Toolbar>
        <Typography variant="h6" noWrap>
          Bienvenido
        </Typography>
      </Toolbar>
      <Divider />
      <ListSubheader>Inicio</ListSubheader>
      <List>
        {menus.map((menu) => (
          <ListItem key={menu.key} disablePadding>
            <ListItemButton
              onClick={menu.onClick}
              sx={{
                backgroundColor: menu?.color || null,
              }}
            >
              <ListItemIcon>{menu.icon}</ListItemIcon>
              <ListItemText primary={menu.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <ListSubheader>Reportes</ListSubheader>
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <AssessmentIcon />
            </ListItemIcon>
            <ListItemText primary="Reporte de cliente" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List
        sx={{
          position: "absolute",
          bottom: "0",
          width: "100%",
        }}
      >
        <ListItem disablePadding>
          <ListItemButton onClick={() => logout()}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary={"Cerrar sesión"} />
          </ListItemButton>
        </ListItem>
      </List>

      <ModalSettings open={openSettingsModal} setOpen={setOpenSettingsModal} />
      <NewProject open={openNewProjectModal} setOpen={setOpenNewProjectModal} />
    </Fragment>
  );

  return drawer;
}

export default MenuIndex;

// const inputText = {
//   ciudad: "Ciudad",
//   createAt: "Fecha de creación",
//   direccion: "Dirección",
//   razonSocial: "Razón social",
//   rfc: "RFC",
// };
