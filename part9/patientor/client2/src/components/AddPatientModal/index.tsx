import {
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
  Alert,
} from "@mui/material";

import AddPatientForm from "./AddPatientForm";
import { useState } from "react";

interface Props {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddPatientModal = ({ modalOpen, setModalOpen }: Props) => {
  const [error, setError] = useState<string>();

  const onClose = () => {
    setError(undefined);
    setModalOpen(false);
  };

  return (
    <Dialog fullWidth={true} open={modalOpen} onClose={onClose}>
      <DialogTitle>Add a new patient</DialogTitle>
      <Divider />
      <DialogContent>
        {error && <Alert severity="error">{error}</Alert>}
        <AddPatientForm onCancel={onClose} setError={setError} />
      </DialogContent>
    </Dialog>
  );
};

export default AddPatientModal;
