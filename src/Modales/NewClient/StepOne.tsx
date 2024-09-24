import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { NewClientStore } from "../../context/NewClientStore";
import GenericModal from "../Generic/GenericModal";
import DatosNewLote from "./DatosNewLote";
import { INewClient, IProyecto } from "../../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { validClientSchema } from "../../utils/helpers";
import { toast } from "react-toastify";

interface StepOneProps {
  openModal: boolean;
  setOpenModal: (openModal: boolean) => void;
  allProjects: IProyecto[];
}

function StepOne({ openModal, setOpenModal, allProjects }: StepOneProps) {
  const { clientName, lote, manzana, projectId } = NewClientStore();
  const newClient = { clientName, lote, manzana, projectId };
  const { control, handleSubmit, setValue, setError, formState: { errors } } = useForm<INewClient>({
    defaultValues: newClient,
    resolver: zodResolver(validClientSchema),
  });
  const onSubmit: SubmitHandler<INewClient> = (data) => {
    console.log(data);
    if (!data.phone || data.phone.length < 10) {
      setError("phone", {
        type: "manual",        
        message: "El teléfono es requerido",
      });
      toast.error("Revisa los campos en rojo");
    }
  };

  useEffect(() => {
    setValue("nombre", clientName);
    setValue("lote", lote);
    setValue("manzana", manzana);
    setValue("projectId", projectId);
  }, [clientName, lote, manzana, projectId, setValue])

  return (
    <GenericModal open={openModal} setOpen={setOpenModal}>
      <DatosNewLote
        allProjects={allProjects}
        data={newClient}
        onSubmit={onSubmit}
        control={control}
        handleSubmit={handleSubmit}
        errors={errors}
      />
    </GenericModal>
  );
}

export default StepOne;
