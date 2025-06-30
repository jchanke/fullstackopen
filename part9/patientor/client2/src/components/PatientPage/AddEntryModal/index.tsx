import {
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
  Alert,
} from "@mui/material";

import AddEntryForm from "./AddEntryForm";
import { useState } from "react";

interface AddPatientModalProps {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddPatientModal = ({ modalOpen, setModalOpen }: AddPatientModalProps) => {
  const [error, setError] = useState<string | undefined>(undefined);

  const onClose = () => {
    setModalOpen(false);
    setError(undefined);
  };

  return (
    <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
      <DialogTitle>Add a new patient</DialogTitle>
      <Divider />
      <DialogContent>
        {error && <Alert severity="error">{error}</Alert>}
        <AddEntryForm onCancel={onClose} setError={setError} />
      </DialogContent>
    </Dialog>
  );
};

export default AddPatientModal;
