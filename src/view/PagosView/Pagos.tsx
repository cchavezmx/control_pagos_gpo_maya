import { useParams } from "react-router-dom";
import ProjectView from "./PagosView";
import useSWR from "swr";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { drawerWidth } from "../Layout";

function Pagos() {
  const { idPoject, idClient } = useParams();
  const { data: pagos } = useSWR(
    `/v2/pagos/proyecto/${idPoject}/cliente/${idClient}`,
    { suspense: true },
  );

  return (
    <Box
      sx={{
        minHeight: "50vh",
        width: `calc(100vw - ${drawerWidth}px)`,
        display: "flex",
        flexDirection: "column",
        padding: "0 2rem",
        marginTop: "80px",
      }}
    >
      <Stack marginBottom={3} gap={1}>
        <Typography variant="h5" textAlign="left">
          Cliente: <strong>{pagos?.cliente?.nombre}</strong>
        </Typography>
        <Typography variant="h5" textAlign="left">
          Proyecto: <strong>{pagos?.project?.title}</strong>
        </Typography>
        <Stack direction="row" gap={1}>
          <Typography variant="h5" textAlign="left">
            Lote: <strong>{pagos?.lote?.lote}</strong>
          </Typography>
          <Typography variant="h5" textAlign="left">
            Manzana: {pagos?.lote?.manzana || "N/A"}
          </Typography>
        </Stack>
      </Stack>
      <Divider
        sx={{
          height: "2px",
          marginBottom: "20px",
        }}
      />
      <Stack>
        <ProjectView data={pagos?.pagos} />
      </Stack>
    </Box>
  );
}

export default Pagos;
