import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { Fragment, useState } from "react";
import NewCient from "../../Modales/NewClient/NewClient";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useNavigate } from "react-router-dom";

function ClientIndex() {
  const [openModalNewClient, setOpenModalNewClient] = useState(false);
  const navigate = useNavigate();
  const menus = [
    {
      key: Math.floor(Math.random() * 1000),
      title: "Regresar",
      icon: <ArrowBackIosNewIcon />,
      onClick: () => navigate("/"),
      color: "#b3e5fc",
    },
    {
      key: Math.floor(Math.random() * 1000),
      title: "Añadir Cliente",
      icon: <AddCircleIcon />,
      onClick: () => setOpenModalNewClient(!openModalNewClient),
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
      <List></List>
      <NewCient open={openModalNewClient} setOpen={setOpenModalNewClient} />
    </Fragment>
  );

  return drawer;
}

export default ClientIndex;
