import {
  Modal,
  Box,
  Stack,
  TextField,
  Button,
  Typography,
  Divider,
  Tooltip,
} from "@mui/material";
import { styleModal } from "../../utils/helpers";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { INewClient, INewClientPost } from "../../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { newClientSearch, createCLient } from "../../services/services";
import { z } from "zod";
import { toast } from "react-toastify";

const validClientSchema = z.object({
  nombres: z.string().min(3).max(50),
  apellidoPaterno: z.string().min(3).max(50),
  apellidoMaterno: z.string().min(3).max(50),
  phone: z.string().refine((value) => /^\d{10,}$/.test(value), {
    message: "El número de teléfono debe tener al menos 10 dígitos.",
  }),
  email: z.string().email().min(5).max(50),
  address: z.string().min(5).max(50),
});

interface ModalSettingsProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const inputText = {
  nombre: "Nombre del cliente",
  apellidoPaterno: "Apellido paterno",
  apellidoMaterno: "Apellido materno",
  phone: "Añadir teléfono",
  email: "Añadir correo electrónico",
  address: "Dirección de contacto",
};

function NewClient({ open, setOpen }: ModalSettingsProps) {
  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<INewClient>({
    resolver: zodResolver(validClientSchema),
  });
  const onSubmit: SubmitHandler<INewClient> = async (data) => {
    patchSettingsData(data);
  };

  async function patchSettingsData(data: INewClient) {
    try {
      console.log({ data });
      const payload = {
        nombre: `${data.nombres.trim()} ${data.apellidoPaterno.trim()} ${data.apellidoMaterno.trim()}`,
        phone: data.phone,
        email: data.email,
        address: data.address,
      } as INewClientPost;

      const verifyClient = await newClientSearch(payload.nombre);
      console.log({ verifyClient });

      if (verifyClient.length > 0) {
        toast.error("El cliente ya existe en la base de datos");
        return;
      }

      const newClient = await createCLient(payload);
      console.log({ newClient });

      if (newClient) {
        toast.success("Cliente añadido correctamente");
        setTimeout(() => {
          handleClose();
        }, 900);
      }
    } catch (error) {
      console.log("🚀 ~ patchSettingsData ~ error", error);
      toast.error("Ocurrió un error al añadir el cliente");
    } finally {
      setIsLoading(false);
      // handleClose();
    }
  }
  console.log("🚀 ~ NewClient ~ errors:", errors);

  const handleClose = () => {
    setOpen(!open);
    reset();
  };

  return (
    <>
      <Modal
        open={open}
        onClose={() => handleClose()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModal}>
          <Stack>
            <Typography variant="h6" component="h2" gutterBottom>
              Añadir nuevo cliente
            </Typography>
            <Typography variant="body2" gutterBottom>
              {<br />}
              <strong>
                Todos los campos son obligatorios, por favor llena los campos
              </strong>
            </Typography>
            <Divider sx={{ height: "2px", marginTop: "20px" }} />
          </Stack>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack gap={1}>
              <Controller
                name="nombres"
                control={control}
                render={({ field: { onChange, ...props } }) => (
                  <TextField
                    autoComplete="off"
                    required
                    {...props}
                    type="text"
                    error={Boolean(errors.nombres)}
                    onChange={(e) => onChange(e.target.value.toUpperCase())}
                    label={inputText.nombre}
                    fullWidth
                    variant="outlined"
                  />
                )}
              />
              <Controller
                name="apellidoPaterno"
                control={control}
                render={({ field: { onChange, ...props } }) => (
                  <TextField
                    autoComplete="off"
                    required
                    {...props}
                    error={Boolean(errors.apellidoPaterno)}
                    label={inputText.apellidoPaterno}
                    fullWidth
                    variant="outlined"
                    onChange={(e) => onChange(e.target.value.toUpperCase())}
                  />
                )}
              />
              <Controller
                name="apellidoMaterno"
                control={control}
                render={({ field: { onChange, ...props } }) => (
                  <TextField
                    autoComplete="off"
                    required
                    {...props}
                    error={Boolean(errors.apellidoMaterno)}
                    label={inputText.apellidoMaterno}
                    fullWidth
                    variant="outlined"
                    onChange={(e) => onChange(e.target.value.toUpperCase())}
                  />
                )}
              />
              <Controller
                name="phone"
                control={control}
                render={({ field: { onChange, ...props } }) => (
                  <Tooltip title={errors.phone && errors.phone.message} arrow>
                    <TextField
                      autoComplete="off"
                      required
                      type="number"
                      {...props}
                      error={Boolean(errors.phone)}
                      label={inputText.phone + " (10 dígitos)"}
                      fullWidth
                      variant="outlined"
                      onChange={(e) => onChange(e.target.value.toUpperCase())}
                    />
                  </Tooltip>
                )}
              />
              <Controller
                name="email"
                control={control}
                render={({ field: { onChange, ...props } }) => (
                  <TextField
                    {...props}
                    autoComplete="off"
                    onChange={(e) => onChange(e.target.value.trim())}
                    type="email"
                    error={Boolean(errors.email)}
                    label={inputText.email}
                    fullWidth
                    variant="outlined"
                  />
                )}
              />
              <Controller
                name="address"
                control={control}
                render={({ field: { onChange, ...props } }) => (
                  <TextField
                    required
                    autoComplete="off"
                    {...props}
                    error={Boolean(errors.address)}
                    label={inputText.address}
                    fullWidth
                    variant="outlined"
                    onChange={(e) => onChange(e.target.value.toUpperCase())}
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
                variant="outlined"
                color="secondary"
                type="button"
                onClick={() => handleClose()}
                disabled={isLoading}
              >
                Cancelar
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={isLoading}
              >
                Continuar
              </Button>
            </Stack>
          </form>
        </Box>
      </Modal>
    </>
  );
}

export default NewClient;
