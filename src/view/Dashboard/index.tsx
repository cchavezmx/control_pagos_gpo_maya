import { useMemo, useState, useEffect } from "react";
import Dashboard from "./Dashboard";
import { Box } from "@mui/material";
import { auth } from "../../services/mutations";
import useSWR from "swr";

function DashboardHOC() {
  const [isAuth, setIsAuth] = useState(false)  
  useEffect(() => {
    auth()
    .then(t => setIsAuth(t))
    .catch(() => {
        window.location.href = "/login"
        localStorage.removeItem("tokenUserSite")
      })
  }, [])

  console.log(isAuth)

  const { data } = useSWR("/v1/proyectos", { suspense: true });
  const { data: settings } = useSWR("/v1/settingsapp/get", { suspense: true })

  const razon = useMemo(() => {
    if (Array.isArray(settings) && settings){
      return settings?.[0].razonSocial;
    }
  }, [settings]);

  return (
    <Box sx={{ minHeight: '50vh', width: "fit-content", marginTop: "30px" }}>
      <Dashboard data={data} razon={razon} />
    </Box>
  );
}

export default DashboardHOC;
