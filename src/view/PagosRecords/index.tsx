import PagosRecordsView from "./PagosRecordsView";
import { Box, Stack, Typography } from "@mui/material";
import useSWR from "swr";
import { drawerWidth } from "../Layout";

function PagosRecors() {
  const { data: records } = useSWR(`/v2/pagos-records`, { suspense: true });
  return (
    <Box>
      <Stack mt={8}>
        <Typography
          component="h1"
          variant="h2"
          textAlign="center"
          sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
        >
          Reporte de Lotes
        </Typography>
      </Stack>
      <Box
        sx={{
          marginTop: "80px",
          minHeight: "50vh",
          width: `calc(100vw - ${drawerWidth}px)`,
          padding: "0 2rem",
        }}
      >
        <PagosRecordsView data={records} />
      </Box>
    </Box>
  );
}

export default PagosRecors;
