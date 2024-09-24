import {
  Modal,
  Box,
  Stack,
  TextField,
  Button,
  Typography,
  FormHelperText,
  Divider,
} from "@mui/material";
import { styleModal } from "../../utils/helpers";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useState } from "react";
import { useSWRConfig } from "swr";
import { getAllProyects } from "../../services/services";
import { ICreateNewLote } from "../../types";
import useSWR from "swr";

interface ModalNewLote {
  open: boolean;
  setOpen: (open: boolean) => void;
  addLote: (idProyecto: string, payload: ICreateNewLote) => Promise<Response>;
  currentClient: string;
}

const inputText = {
  proyecto: "Nombre del proyecto",
  lote: "Número de lote",
  manzana: "Manzana",
  precioTotal: "Precio total",
  enganche: "Enganche",
  financiamiento: "Financiamiento",
  plazo: "Plazo",
  mensualidad: "Mensualidad",
  inicioContrato: "Inicio de contrato",
};

function ModalNewLote({ open, setOpen, addLote }: ModalNewLote) {
  const { mutate } = useSWRConfig();
  const { data: getProjects } = useSWR(getAllProyects);
  console.log({ getProjects });
  const handleClose = () => {
    setOpen(!open);
  };

  const { handleSubmit, control } = useForm<ICreateNewLote>();
  const onSubmit: SubmitHandler<ICreateNewLote> = async (data) =>
    patchSettingsData(data);

  const [isLoading, setIsLoading] = useState(false);
  async function patchSettingsData(data: ICreateNewLote) {
    setIsLoading(true);
    const idProyecto = "1";
    const r = await addLote(idProyecto, data);
    console.log({ r });
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
            Añadir nuevo lote
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack>
              <FormHelperText
                sx={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  color: "#6E6893",
                  marginTop: "20px",
                }}
              >
                Datos del lote
              </FormHelperText>
              <Stack gap={1} marginTop={3} direction="row">
                <Controller
                  name="lote"
                  control={control}
                  render={({ field: { onChange, ...props } }) => (
                    <TextField
                      {...props}
                      required
                      autoComplete="off"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          height: "40px",
                          padding: "0 14px",
                        },
                        "& .MuiInputLabel-root": {
                          top: "-6px",
                        },
                      }}
                      label={inputText.lote}
                      fullWidth
                      variant="outlined"
                      onChange={(e) =>
                        onChange(e.target.value.toUpperCase().trim())
                      }
                    />
                  )}
                />
                <Controller
                  name="manzana"
                  control={control}
                  render={({ field: { onChange, ...props } }) => (
                    <TextField
                      {...props}
                      required
                      autoComplete="off"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          height: "40px",
                          padding: "0 14px",
                        },
                        "& .MuiInputLabel-root": {
                          top: "-6px",
                        },
                      }}
                      label={inputText.manzana}
                      fullWidth
                      variant="outlined"
                      onChange={(e) =>
                        onChange(e.target.value.toUpperCase().trim())
                      }
                    />
                  )}
                />
              </Stack>              
            </Stack>
            <Stack>
              <FormHelperText
                sx={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  color: "#6E6893",
                  marginTop: "20px",
                }}
              >
                Datos del lote
              </FormHelperText>
              <Stack gap={1} marginTop={3} direction="row">
                <Controller
                  name="lote"
                  control={control}
                  render={({ field: { onChange, ...props } }) => (
                    <TextField
                      {...props}
                      required
                      autoComplete="off"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          height: "40px",
                          padding: "0 14px",
                        },
                        "& .MuiInputLabel-root": {
                          top: "-6px",
                        },
                      }}
                      label={inputText.lote}
                      fullWidth
                      variant="outlined"
                      onChange={(e) =>
                        onChange(e.target.value.toUpperCase().trim())
                      }
                    />
                  )}
                />
                <Controller
                  name="manzana"
                  control={control}
                  render={({ field: { onChange, ...props } }) => (
                    <TextField
                      {...props}
                      required
                      autoComplete="off"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          height: "40px",
                          padding: "0 14px",
                        },
                        "& .MuiInputLabel-root": {
                          top: "-6px",
                        },
                      }}
                      label={inputText.manzana}
                      fullWidth
                      variant="outlined"
                      onChange={(e) =>
                        onChange(e.target.value.toUpperCase().trim())
                      }
                    />
                  )}
                />
              </Stack>              
            </Stack>
            <Stack>
              <FormHelperText
                sx={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  color: "#6E6893",
                  marginTop: "20px",
                }}
              >
                Datos del lote
              </FormHelperText>
              <Stack gap={1} marginTop={3} direction="row">
                <Controller
                  name="lote"
                  control={control}
                  render={({ field: { onChange, ...props } }) => (
                    <TextField
                      {...props}
                      required
                      autoComplete="off"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          height: "40px",
                          padding: "0 14px",
                        },
                        "& .MuiInputLabel-root": {
                          top: "-6px",
                        },
                      }}
                      label={inputText.lote}
                      fullWidth
                      variant="outlined"
                      onChange={(e) =>
                        onChange(e.target.value.toUpperCase().trim())
                      }
                    />
                  )}
                />
                <Controller
                  name="manzana"
                  control={control}
                  render={({ field: { onChange, ...props } }) => (
                    <TextField
                      {...props}
                      required
                      autoComplete="off"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          height: "40px",
                          padding: "0 14px",
                        },
                        "& .MuiInputLabel-root": {
                          top: "-6px",
                        },
                      }}
                      label={inputText.manzana}
                      fullWidth
                      variant="outlined"
                      onChange={(e) =>
                        onChange(e.target.value.toUpperCase().trim())
                      }
                    />
                  )}
                />
              </Stack>              
            </Stack>
            <Stack>
              <FormHelperText
                sx={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  color: "#6E6893",
                  marginTop: "20px",
                }}
              >
                Datos del lote
              </FormHelperText>
              <Stack gap={1} marginTop={3} direction="row">
                <Controller
                  name="lote"
                  control={control}
                  render={({ field: { onChange, ...props } }) => (
                    <TextField
                      {...props}
                      required
                      autoComplete="off"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          height: "40px",
                          padding: "0 14px",
                        },
                        "& .MuiInputLabel-root": {
                          top: "-6px",
                        },
                      }}
                      label={inputText.lote}
                      fullWidth
                      variant="outlined"
                      onChange={(e) =>
                        onChange(e.target.value.toUpperCase().trim())
                      }
                    />
                  )}
                />
                <Controller
                  name="manzana"
                  control={control}
                  render={({ field: { onChange, ...props } }) => (
                    <TextField
                      {...props}
                      required
                      autoComplete="off"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          height: "40px",
                          padding: "0 14px",
                        },
                        "& .MuiInputLabel-root": {
                          top: "-6px",
                        },
                      }}
                      label={inputText.manzana}
                      fullWidth
                      variant="outlined"
                      onChange={(e) =>
                        onChange(e.target.value.toUpperCase().trim())
                      }
                    />
                  )}
                />
              </Stack>              
            </Stack>
            <Divider sx={{ height: "2px", marginTop: "20px" }} />
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

export default ModalNewLote;
