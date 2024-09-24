import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ILote } from "../../types";
import { currencyValueGetter, dayformatValueGutter } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";

export default function TableClientView(props: { lotes: ILote[] }) {
  const navigate = useNavigate();
  if (!Array.isArray(props.lotes) || props.lotes.length === 0) {
    return (
      <>
        <h1>No hay lotes</h1>
      </>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Proyecto</TableCell>
            <TableCell align="right">Lote</TableCell>
            <TableCell align="right">Manzana</TableCell>
            <TableCell align="right">Inicio de contrato</TableCell>
            <TableCell align="right">Mensualidad</TableCell>
            <TableCell align="right">Plazo</TableCell>
            <TableCell align="right">Precio total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.lotes.map((row) => (
            <TableRow
              key={row._id}
              onClick={() =>
                navigate(`/pagos/proyecto/${row.proyecto._id}/cliente/${row.cliente._id}`)
              }
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                cursor: "pointer",
                "&:hover": { backgroundColor: "#f5f5f5" },
              }}
            >
              <TableCell component="th" scope="row">
                {row?.proyecto?.title?.toUpperCase()}
              </TableCell>
              <TableCell align="right">{row.lote}</TableCell>
              <TableCell align="right">{row.manzana}</TableCell>
              <TableCell align="right">
                {dayformatValueGutter(row.inicioContrato)}
              </TableCell>
              <TableCell align="right">
                {currencyValueGetter(row.mensualidad)}
              </TableCell>
              <TableCell align="right">{row.plazo}</TableCell>
              <TableCell align="right">
                {currencyValueGetter(row.precioTotal)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
