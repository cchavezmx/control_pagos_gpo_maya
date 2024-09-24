import { Box, Stack, Typography, Divider } from "@mui/material";
import ProjectCard from "../../components/ProjectCard";
import { drawerWidth } from "../Layout";
import { DashboardDataComponent, DataItem } from "../../types.ts";

function Dashboard(props: DashboardDataComponent) { 
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        marginTop: "80px",
        minHeight: "80vh",
        minWidth: `calc(100% - ${drawerWidth}px)`,
        overflow: "hiden",
        alignContent: "center",
      }}
    >
        <Stack direction="row" justifyContent="space-around" alignItems="center" sx={{
          '@media (max-width: 60rem)': {
            flexDirection: "column",
            gap: "20px",
          }
        }}>
          <Typography variant="h5" textAlign="left" ml={3}>
            Razón Social: <strong>{props.razon?.toUpperCase()}</strong>
          </Typography>           
        </Stack>
      <Divider sx={{ height: "2px", marginBottom: "20px", width: "100%" }} />
      <Stack
        direction="row"
        sx={{
          flexWrap: "wrap",
          gap: "20px",
          padding: "20px",
          backgroundColor: "white",
          marginTop: "20px",
          display: "flex",
        }}
      >
        {
          props.data?.map((p: DataItem) => (
            <ProjectCard key={p._id} project={p} />
          ))
        }
      </Stack>
    </Box>
  );
}


export default Dashboard;
