import { Box } from "@mui/material";
import TableLotesView from "../../components/TableLotes/TableLotesView";
import { ILotesRow } from "../../types";

function ProjectView(props: { data: ILotesRow[] }) {
  const { data } = props;

  return (
    <Box>
      <TableLotesView data={data} />
    </Box>
  );
}

export default ProjectView;
