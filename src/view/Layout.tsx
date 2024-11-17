import * as React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Stack,
  AppBar,
  Box,  
  Drawer,
  IconButton,  
  Toolbar,
  CssBaseline,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import MenuIndex from "../components/Menu/MenuIndex";
import ClientIndex from "../components/Menu/ClientIndex";
import ProjectIndex from "../components/Menu/ProjectIndex";
import PaymentsIndex from "../components/Menu/PaymentsIndex";
import MorososIndex from "../components/Menu/MorososIndex"
import ReporteClienteIndex from "../components/Menu/ReporteClienteIndex";
import PayDetailsIndex from "../components/Menu/PayDetailsIndex";

export const drawerWidth = 240;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window?: () => Window;
  children: React.ReactNode;
}

export default function Layout(props: Props) {
  const location = useLocation();  
  const { children } = props;
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const pathNames: { [key: string]: string } = {
    "": "home",
    "search": "search",
    "proyecto": "project",
    "pagos": "payments",
    "morosos": "morosos",
    "pagos-record": "reportes",
    "payments-details": "paydetails",
  };

  const drawerMenus: { [key: string]: React.ReactElement } = {
    home: <MenuIndex />,
    search: <ClientIndex />,
    project: <ProjectIndex />,
    payments: <PaymentsIndex />,
    morosos: <MorososIndex />,
    reportes: <ReporteClienteIndex />,
    paydetails: <PayDetailsIndex />,
  };

  const [, route] = location.pathname.split("/");
  const drawer = drawerMenus[pathNames[route]];  

  // Remove this const when copying and pasting into your project.
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
          <Stack sx={{ height: "80px", padding: "8px 0" }}>
            <img
              src="/img/logo_blanco.png"
              alt="logo"
              style={{ height: "100%" }}
            />
          </Stack>
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
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
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
          {}
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
      {children}
    </Box>
  );
}
