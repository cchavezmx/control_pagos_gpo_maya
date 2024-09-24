import TablePagosView from "../../components/TablePagos/TablePagosView";
import { IPagos } from "../../types";

function PagosView(props: { data: IPagos[] }) {
  const { data } = props;

  return <TablePagosView data={data} />;
}

export default PagosView;
