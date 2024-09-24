/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { Box, Stack, Typography, Divider, Button } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import { drawerWidth } from "../Layout";
import AsyncSelect from "react-select/async";
import { ReactSelectCallback, Ilote } from "../../types";
import TableClientView from "./TableClientView";

interface Props {
  handleChange: (query: string, callback: ReactSelectCallback) => Promise<void>;
  defaultValue: string;
  isLoading?: boolean;
  onChange: (value: string) => void;
  lotes: Ilote[];
  validClient: boolean;
  setNewLote: (value: boolean) => void;
}

const ButtonAcctions = ({
  title,
  onClick,
}: {
  title: string;
  onClick: (value: boolean) => avoid;
}) => {
  return (
    <Button
      onClick={onClick}
      variant="outlined"
      sx={{
        maxWidth: "200px",
        height: "30px",
      }}
    >
      {title}
    </Button>
  );
};

function ClientesView(props: Props) {
  const {
    handleChange,
    defaultValue,
    isLoading,
    onChange,
    lotes,
    validClient,
    setNewLote,
  } = props;
  console.log("🚀 ~ ClientesView ~ validClient:", validClient);
  console.log("🚀 ~ ClientesView ~ defaultValue:", defaultValue);
  return (
    <Box
      sx={{
        width: `calc(100vw - ${drawerWidth}px)`,
        height: "calc(100vh - 200px)",
        display: "flex",
        flexDirection: "column",
        padding: "0 2rem",
      }}
    >
      <Stack marginBottom={3} marginTop={4}>
        <Typography
          variant="h4"
          textAlign="left"
          sx={{
            fontWeight: "bold",
          }}
        >
          Clientes
        </Typography>
      </Stack>
      <Stack>
        <AsyncSelect
          isSearchable
          placeholder="Buscar cliente"
          isClearable
          cacheOptions
          value={defaultValue[0]}
          loadOptions={handleChange}
          menuShouldScrollIntoView
          onChange={onChange}
        />
        <Stack>
          <Divider
            sx={{
              height: "2px",
              marginTop: "20px",
            }}
          />
          {isLoading && (
            <Box sx={{ width: "100%", mr: 1 }}>
              <LinearProgress variant="indeterminate" />
            </Box>
          )}
        </Stack>
      </Stack>
      <Stack
        sx={{
          marginTop: "20px",
        }}
      >
        {validClient && (
          <Box sx={{ gap: 1, display: "flex" }}>
            <ButtonAcctions title="Actualizar cliente" />
            <ButtonAcctions
              title="Añadir lote"
              onClick={() => setNewLote(true)}
            />
          </Box>
        )}
      </Stack>
      <Divider sx={{ height: "2px", marginTop: "20px" }} />
      <Stack>
        {Array.isArray(props.lotes) && props.lotes.length > 0 && (
          <Stack
            sx={{
              marginTop: "20px",
            }}
          >
            <Typography
              variant="h5"
              textAlign="left"
              sx={{ fontWeight: "bold" }}
            >
              Detalles del cliente
            </Typography>
            <Stack>
              <Divider
                sx={{
                  height: "2px",
                  marginTop: "20px",
                }}
              />
            </Stack>
            <Stack>
              <TableClientView lotes={lotes} />
            </Stack>
          </Stack>
        )}
        {!validClient && props.lotes?.length === 0 && !isLoading && (
          <Typography
            variant="h5"
            textAlign="left"
            sx={{ fontWeight: "bold", color: "#616161" }}
          >
            Realiza una búsqueda para ver los detalles del cliente
          </Typography>
        )}
        {validClient && props.lotes?.length === 0 && !isLoading && (
          <Typography
            variant="h5"
            textAlign="left"
            sx={{ fontWeight: "bold", color: "#616161" }}
          >
            El cliente no tiene lotes asignados, añade uno "👍️"
          </Typography>
        )}
      </Stack>
    </Box>
  );
}

export default ClientesView;
