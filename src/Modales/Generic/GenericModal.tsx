import {
  Modal,
  Box,
} from "@mui/material";
import { styleModal } from "../../utils/helpers";

interface ModalSettingsProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  children: React.ReactNode;
}


function GenericModal({ open, setOpen, children }: ModalSettingsProps) {
  const handleClose = () => {
    setOpen(!open);
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
          {children}        
        </Box>
      </Modal>
    </>
  );
}

export default GenericModal;
