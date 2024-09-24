import { Suspense } from "react";
import { Box, Stack, Typography } from "@mui/material";
import Layout from "../view/Layout";

function Loading() {
  return (
    <Box sx={{
      display: 'grid',
      placeContent: 'center',
      minHeight: '90vh',
      width: '80vw',
    }}>
      <Stack gap={3} alignItems="center">
        <div className="loader"></div>
        <Typography variant="caption">
          Cargando información...
        </Typography>
      </Stack>
    </Box>
  )
}

function Wrapper(props: { children: React.ReactNode }) {
  return (
    <>
      <Layout>
        <Suspense fallback={<Loading />}>
          {props.children}
        </Suspense>
      </Layout>
      ;
    </>
  );
}

export default Wrapper;
