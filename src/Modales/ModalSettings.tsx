import useSWR from "swr";
import {
  Modal,
  Box,
  Typography,
  Stack,
  TextField,
  Button,
} from "@mui/material";
import { styleModal } from "../utils/helpers";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { config } from "../services/config";
import { useState } from "react";
import { useSWRConfig } from "swr";
import { getAllProyects } from "../services/services";

interface ModalSettingsProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const inputText = {
  ciudad: "Ciudad",
  createAt: "Fecha de creación",
  direccion: "Dirección",
  razonSocial: "Razón social",
  rfc: "RFC",
};

type Inputs = {
  _id: string;
  ciudad: string;
  direccion: string;
  razonSocial: string;
  rfc: string;
};

function ModalSettings({ open, setOpen }: ModalSettingsProps) {
  const { mutate } = useSWRConfig();
  const { data } = useSWR("/v1/settingsapp/get");
  const handleClose = () => {
    setOpen(!open);
  };

  const { handleSubmit, control } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) =>
    patchSettingsData(data);

  const [isLoading, setIsLoading] = useState(false);
  async function patchSettingsData(data: Inputs) {
    setIsLoading(true);
    return fetch(`${config.apiUrl}/v1/settingsapp/dataInfo`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Error en la petición");
        }
        return res.json();
      })
      .then(() => {
        toast.success("Datos actualizados correctamente");
        mutate(getAllProyects);
      })
      .catch(() => {
        toast.error("Error al actualizar los datos");
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
          handleClose();
        }, 2000);
      });
  }

  return (
    <>
      <Modal
        open={open}
        onClose={() => handleClose()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModal}>
          {Array.isArray(data) && data.length > 0 && (
            <>
              <Typography variant="h5" textAlign="left" marginBottom={3}>
                Configuración de la aplicación
              </Typography>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={2} marginTop={2}>
                  <Controller
                    name="_id"
                    control={control}
                    defaultValue={data[0]._id}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        sx={{ display: "none" }}
                        label="ID"
                        fullWidth
                        variant="outlined"
                        disabled
                      />
                    )}
                  />
                  <Controller
                    name="ciudad"
                    control={control}
                    defaultValue={data[0].ciudad}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label={inputText.ciudad}
                        fullWidth
                        variant="outlined"
                      />
                    )}
                  />
                  <Controller
                    name="direccion"
                    control={control}
                    defaultValue={data[0].direccion}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label={inputText.direccion}
                        fullWidth
                        variant="outlined"
                      />
                    )}
                  />
                  <Controller
                    name="razonSocial"
                    control={control}
                    defaultValue={data[0].razonSocial}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label={inputText.razonSocial}
                        fullWidth
                        variant="outlined"
                      />
                    )}
                  />
                  <Controller
                    name="rfc"
                    control={control}
                    defaultValue={data[0].rfc}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label={inputText.rfc}
                        fullWidth
                        variant="outlined"
                      />
                    )}
                  />
                </Stack>
                <Stack
                  spacing={2}
                  marginTop={2}
                  direction="row"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    variant="outlined"
                    type="submit"
                    color="secondary"
                    disabled={isLoading}
                  >
                    Guardar
                  </Button>
                  <Button onClick={() => handleClose()} variant="contained">
                    Cerrar
                  </Button>
                </Stack>
              </form>
            </>
          )}
        </Box>
      </Modal>
    </>
  );
}

export default ModalSettings;
