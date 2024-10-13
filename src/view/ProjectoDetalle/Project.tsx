import { useParams } from "react-router-dom";
import ProjectView from "./ProjectView";
import useSWR from "swr";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { drawerWidth } from "../Layout";

function Project() {
  const { id } = useParams();
  const { data: lotes } = useSWR(`/v2/lotes/proyecto/${id}`, { suspense: true });

  console.log(lotes, "lotesByProject");
  
  return (
    <Box
      sx={{
        marginTop: "80px",
        minHeight: "50vh",
        width: `calc(100vw - ${drawerWidth}px)`,
        padding: "0 2rem",
      }}
    >
      <Stack marginBottom={3} marginTop={4}>
        <Typography variant="h5" textAlign="left">
          VISTA DE LOTES POR PROYECTO
        </Typography>
        <Typography variant="h5" textAlign="left">
          Proyecto: <strong>{lotes?.title}</strong>
        </Typography>
      </Stack>
      <Divider sx={{        
        height: "2px",
        marginBottom: "20px",      
      }} />
      <ProjectView data={lotes?.lotes} />
    </Box>
  );
}

export default Project;
