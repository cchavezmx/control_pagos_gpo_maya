import { Box, Button, Stack } from "@mui/material";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { IPagos } from "../../types";
import { currencyValueGetter, dayformatValueGutter } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Acciones(row: { row: any }) {
  const navigate = useNavigate();
  return (
    <Stack
      direction="row"
      gap={1}
      justifyContent="center"
      alignItems="center"
      height="100%"
    >
      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={() =>
          navigate(
            `/pagos/proyecto/${row.row.idproyecto}/cliente/${row.row.idcliente}`
          )
        }
      >
        Ver
      </Button>
      <Button
        variant="contained"
        color="error"
        size="small"
        onClick={() => console.log(row.row)}
      >
        Editar
      </Button>
      <Button
        variant="contained"
        color="error"
        size="small"
        onClick={() => console.log(row.row)}
      >
        Editar
      </Button>
      <Button
        variant="contained"
        color="error"
        size="small"
        onClick={() => console.log(row.row)}
      >
        Editar
      </Button>
    </Stack>
  );
}

const columns: GridColDef<(typeof makeRows)[]>[] = [
  {
    field: "folio",
    headerName: "Folio",
    width: 80,
    headerAlign: "center",
    type: "number",
    sortable: true,
    align: "center",
  },
  {
    field: "status",
    headerName: "Status",
    width: 150,
    headerAlign: "center",
    align: "center",
  },  
  {
    field: "mensualidad",
    headerName: "Mensualidad",
    width: 150,
    headerAlign: "center",
    align: "center",
    valueGetter: currencyValueGetter,
  },
  {
    field: "mes",
    headerName: "Mes",
    width: 150,
    headerAlign: "center",
    align: "center",    
    valueGetter: dayformatValueGutter,
  },
  {
    field: "refPago",
    headerName: "Ref. Pago",
    width: 150,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "tipoPago",
    headerName: "Tipo Pago",
    width: 150,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "acciones",
    headerName: "Acciones",
    width: 350,
    headerAlign: 'center',
    renderCell: Acciones,
  },
];

const makeRows = (data: IPagos[]) => {
  if (!data) return [];
  return data.map((r: IPagos) => {
    console;
    return {
      ...r,
      id: r._id,
      folio: Number(r.folio),
      lote: r.lote.lote,
      manzana: r.lote.manzana,
      mes: r.mes,
      refPago: r.refPago,
      tipoPago: r.tipoPago,
      status: r.status,
      mensualidad: r.mensualidad,
    };
  });
};

export default function TablePagosView(props: { data: IPagos[] }) {
  const { data } = props;
  const rows = makeRows(data);

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
              inicioContrato: false,
            },
          },
        }}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        rows={rows as any}
        columns={columns}
        pageSizeOptions={[5, 10, 20, 50, 100]}        
        disableRowSelectionOnClick
        slots={{
          toolbar: GridToolbar,
        }}
      />
    </Box>
  );
}
