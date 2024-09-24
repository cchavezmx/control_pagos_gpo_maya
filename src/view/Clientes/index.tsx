/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { useCallback, useState } from "react";
import ClientesView from "./ClientesView";
import { ClienteData } from "../../types";
import { getClient, getClientData } from "../../services/services";
import { toast } from "react-toastify";
import { debounce } from "lodash";
import ModalNewLote from "../../Modales/NewLote/ModalNewLote";

function Clientes() {
  const [value, setValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [validClient, setValidClient] = useState<boolean>(false);
  const [currentClient, setCurrentClient] = useState<string>("");

  const handledSubmit = debounce(async (queryValue, callback) => {
    setIsLoading(true);
    setValue("");
    setValidClient(false);
    if (queryValue.length > 4) {
      getClientData(queryValue as string)
        .then((r) => {
          if (r.status !== 200) {
            throw new Error("Error en la petición");
          }
          return r.json();
        })
        .then((data) => {
          if (data.message.length === 0) {
            toast.info(
              "No se encontraron resultados, intenta con otro nombre de cliente",
            );
            setIsLoading(false);
            setValidClient(false);
            return;
          }

          const res = data.message.map((item: ClienteData) => {
            return {
              value: item._id,
              label: item.nombre,
            };
          });
          callback(res);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, 1200);

  const handleChange = useCallback((query, callback) => {
    handledSubmit(query, callback);
  }, []);

  const [lotes, setLotes] = useState<ILote[]>([]);
  const onChange = (value: string) => {
    if (value) {
      getClient({ id: value.value })
        .then((r) => r.json())
        .then((data) => {
          setValidClient(true);
          setCurrentClient(value);
          setLotes(data.message.lotes);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
          setCurrentClient("");
        });
    } else {
      setLotes([]);
      setValidClient(false);
      setCurrentClient("");
    }
  };

  const [newLote, setNewLote] = useState(false);
  console.log("🚀 ~ Clientes ~ newLote:", newLote);
  const addLote = (idProyecto: string, payload: ICreateNewLote) => {
    console.log({ currentClient });
    addLoteToUser(idProyecto, payload)
      .then((res) => {
        console.log({ res });
        toast.success("Lote agregado correctamente");
      })
      .catch((err) => {
        console.log({ err });
        toast.error("Ocurrió un error al agregar el lote");
      });
  };

  return (
    <>
      <ClientesView
        onSubmit={handledSubmit}
        handleChange={handleChange}
        defaultValue={value}
        isLoading={isLoading}
        onChange={onChange}
        lotes={lotes}
        validClient={validClient}
        setNewLote={setNewLote}
      />
      <ModalNewLote
        open={newLote}
        setOpen={setNewLote}
        addLote={addLote}
        currentClient={currentClient}
      />
    </>
  );
}

export default Clientes;
