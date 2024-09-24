import {
  Modal,
  Box,
  Stack,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { styleModal } from "../../utils/helpers";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useState } from "react";
import { createProject } from "../../services/services";
import { useSWRConfig } from "swr";
import { getAllProyects } from "../../services/services";

interface ModalSettingsProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const inputText = {
  title: "Nombre del proyecto",
  address: "Ubicación del proyecto",
};

type Inputs = {
  title: string;
  address: string;
};

function NewProject({ open, setOpen }: ModalSettingsProps) {

  const { mutate } = useSWRConfig();
  const handleClose = () => {
    setOpen(!open);
  };

  const { handleSubmit, control } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) =>
    patchSettingsData(data);

  const [isLoading, setIsLoading] = useState(false);
  async function patchSettingsData(data: Inputs) {
    setIsLoading(true);
    const r = await createProject({ payload: data });
    if (r.status === 200) {
      toast.success("Proyecto creado correctamente");
      mutate(getAllProyects);
      handleClose();
    } else {
      toast.error("Error al crear el proyecto");
    }
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
          <Typography variant="h6" component="h2" gutterBottom>
            Añadir nuevo clientes
          </Typography> 
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack gap={1}>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={inputText.title}
                    fullWidth
                    variant="outlined"
                  />
                )}
              />
              <Controller
                name="address"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={inputText.address}
                    fullWidth
                    variant="outlined"
                  />
                )}
              />
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
                disabled={isLoading}
              >
                Guardar
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleClose()}
                disabled={isLoading}
              >
                Cancelar
              </Button>
            </Stack>
          </form>
        </Box>
      </Modal>
    </>
  );
}

export default NewProject;
