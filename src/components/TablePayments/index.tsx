import { Box, Stack, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { PaymentsDetails } from "../../types";
import { currencyValueGetter, dayformatValueGutter } from "../../utils/helpers";

const columns: GridColDef<(typeof makeRows)[]>[] = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "mes", headerName: "Fecha de pago", width: 150, align: "center" },
  { field: "refPago", headerName: "Referencia de Pago", width: 250 },
  {
    field: "mensualidad",
    headerName: "Mensualidad",
    type: "number",
    width: 150,
  },
  { field: "tipoPago", headerName: "Tipo de Pago", width: 150 },
  { field: "folio", headerName: "Folio", width: 150 },
];

const makeRows = (data: PaymentsDetails[]) => {
  if (!data) return [];
  return data.map((r: PaymentsDetails) => {
    return {
      ...r,
      id: r._id,
      mes: dayformatValueGutter(r.mes),
      refPago: r.refPago.toLocaleUpperCase(),
      mensualidad: r.mensualidad,
      tipoPago: r.tipoPago,
      folio: r.folio,
      banco: r.banco,
    };
  });
};

export default function TableLotesView(props: {
  data: PaymentsDetails[];
  title: string;
}) {
  const { data, title } = props;
  const rows = makeRows(data);
  const lote = data[0]?.lote;
  const sum = data.reduce((acc, item) => acc + item.mensualidad, 0);

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
      <Stack spacing={2} direction="row" justifyContent="space-between">
        <Stack>
          <Typography variant="h5" component="h1">
            Pagos {title}
          </Typography>
          <Typography variant="body1" component="p">
            Lote: {lote?.lote} Manzana: {lote?.manzana}
          </Typography>
        </Stack>
        <Stack>
          <Typography variant="body1" component="p">
            Pagos Realizados {data?.length}
          </Typography>
          <Typography variant="h6" component="h2">
            Total Pagado: {currencyValueGetter(sum)}
          </Typography>
        </Stack>
      </Stack>
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
            },
          },
        }}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        rows={rows as any}
        columns={columns}
        pageSizeOptions={[5, 10, 20, 50, 100]}
        disableRowSelectionOnClick
        checkboxSelection={false}
        slots={{
          toolbar: GridToolbar,
        }}
      />
    </Box>
  );
}
