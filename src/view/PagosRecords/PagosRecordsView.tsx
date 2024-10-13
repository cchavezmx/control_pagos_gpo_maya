// @eslint-disable

import { PagosRecordsDataRow } from "../../types";
import { DataGrid, GridToolbar, GridCellProps } from "@mui/x-data-grid";
import { Box, Button, Chip } from "@mui/material";
import { esES } from "@mui/x-data-grid/locales";
import { currencyValueGetter, dayformatValueGutter } from "../../utils/helpers";

export default function PagosRecordsView(props: {
  data: PagosRecordsDataRow[];
}) {
  const { data } = props;
  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "cliente", headerName: "Cliente", width: 200 },
    {
      field: "totalMensualidad",
      headerName: "Total Mensualidad",
      width: 150,
      renderCell: (params: GridCellProps) => currencyValueGetter(params.value),
    },
    {
      field: "pagosExtra",
      headerName: "Pagos Extra",
      width: 150,
      renderCell: () => <Button variant="outlined">Extra</Button>,
    },
    {
      field: "pagosMoratorios",
      headerName: "Pagos Moratorios",
      width: 150,
      renderCell: (params: GridCellProps) =>
        params.value > 0 ? currencyValueGetter(params.value) : "Sin mora",
    },
    { field: "numeroDePagos", headerName: "Número de Pagos", width: 150 },
    { field: "pagosTotales", header: "Pagos Totales", width: 150 },
    { field: "proyecto", headerName: "Proyecto", width: 200 },
    { field: "lote", headerName: "Lote", width: 100 },
    {
      field: "isPaid",
      headerName: "Pagado",
      width: 120,
      renderCell: (params: GridCellProps) =>
        params.value ? (
          <Chip label="Pagado" color="success" />
        ) : (
          <Chip label="Pendiente" color="warning" />
        ),
    },
    {
      field: "createdAt",
      headerName: "Última actualización",
      width: 200,
      renderCell: (params: GridCellProps) => dayformatValueGutter(params.value),
    },
  ];

  return (
    <Box
      sx={{
        height: "70vh",
        width: "100%",
        "& .super-app-theme--Rejected": {
          bgcolor: "#bdc3c7",
          color: "#34495e",
          "&:hover": {
            bgcolor: "#bdc3c7",
          },
        },
      }}
    >
      <DataGrid
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 15,
            },
          },
          columns: {
            columnVisibilityModel: {
              id: false,
              enganche: false,
              financiamiento: false,
              plazo: false,
              mensualidad: false,
              inicioContrato: false,
            },
          },
        }}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        rows={data as PagosRecordsDataRow[]}
        // eslint-disable-next-line
        columns={columns as any}
        pageSizeOptions={[5, 10, 20, 50, 100]}
        disableRowSelectionOnClick
        checkboxSelection={false}
        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        slots={{
          toolbar: GridToolbar,
        }}
      />
    </Box>
  );
}
