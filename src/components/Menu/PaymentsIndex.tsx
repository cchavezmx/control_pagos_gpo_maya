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
import LogoutIcon from "@mui/icons-material/Logout";
import { Fragment } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/mutations";

function PaymentsIndex() {
  const navigate = useNavigate();

  const menus = [
    {
      key: Math.floor(Math.random() * 1000),
      title: "Regresar",
      icon: <ArrowBackIosNewIcon />,
      onClick: () => navigate("/"),
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
            <ListItemButton onClick={menu.onClick}>
              <ListItemIcon>{menu.icon}</ListItemIcon>
              <ListItemText primary={menu.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <ListSubheader>Reportes</ListSubheader>
      <List>
        {/*
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
              <AssessmentIcon />
              </ListItemIcon>
              <ListItemText primary="Reporte de cliente" />
            </ListItemButton>
        </ListItem>
        */}
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
    </Fragment>
  );

  return drawer;
}

export default PaymentsIndex;
