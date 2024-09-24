/* eslint-disable */
// @ts-nocheck
import {
  Box,
  Stack,
  Typography,
  Divider,
  TextField,
  Button,
  Select,
  FormHelperText,
  MenuItem,
} from "@mui/material";
import { INewClient, IProyecto } from "../../types";
import {
  Control,
  Controller,
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
} from "react-hook-form";

interface DatosNewLoteProps {
  data: INewClient;
  control: Control<INewClient>;
  onSubmit: SubmitHandler<INewClient>;
  handleSubmit: UseFormHandleSubmit<INewClient>;
  allProjects: IProyecto[];
  errors?: FieldErrors<INewClient>;  
}

function DatosNewLote(props: DatosNewLoteProps) {
  const { data, control, onSubmit, handleSubmit, allProjects, errors } = props;
  console.log(data);

  return (
    <Box>
      <Stack marginBottom={3}>
        <Typography variant="h5">Nuevo cliente</Typography>
        <Divider sx={{ margin: "10px", marginBottom: 3 }} />
        <Typography variant="body1">
          <strong>
            Para mejorar la base de de datos, por favor, ingrese los siguientes
            datos:
          </strong>
        </Typography>
      </Stack>
      <Stack>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack gap={1}>
            <Controller
              name="clientName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  error={Boolean(errors?.clientName)}
                  label="Nombre del cliente"
                  fullWidth
                  variant="outlined"                  
                />
              )}
            />
            <Controller
              name="lote"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  error={Boolean(errors?.lote)}
                  label="Lote"
                  fullWidth
                  variant="outlined"                  
                />
              )}
            />
            <Controller
              name="manzana"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}                  
                  error={Boolean(errors?.manzana)}
                  label="Manzana"
                  fullWidth
                  variant="outlined"
                />
              )}
            />
            <Controller
              name="telefono"              
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  error={Boolean(errors?.telefono)}
                  label="Teléfono"
                  fullWidth
                  variant="outlined"
                />
              )}
            />
            <FormHelperText>
              Selecciona el proyecto al que pertenece el lote
              <Controller
                name="projectId"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    error={Boolean(errors?.projectId)}
                    label="Proyecto"
                    fullWidth
                    variant="outlined"
                  >
                    {Array.isArray(allProjects) &&
                      allProjects.map((item: IProyecto) => {
                        return (
                          <MenuItem key={item._id} value={item._id}>
                            {item?.title?.toUpperCase()}
                          </MenuItem>
                        );
                      })}
                  </Select>
                )}
              />
            </FormHelperText>
          </Stack>
          <Stack
            spacing={2}
            direction="row"
            justifyContent="flex-end"
            sx={{
              marginTop: "20px",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              type="submit"              
            >
              Continuar
            </Button>
          </Stack>
        </form>
      </Stack>
    </Box>
  );
}

export default DatosNewLote;
