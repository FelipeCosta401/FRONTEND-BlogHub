import { useContext, useEffect, useState } from "react";
import axiosInstance from "../../services/axiosConfig";

import { ToastContainer, toast } from "react-toastify";
import { Dialog } from "primereact/dialog";
import Button from "@mui/material/Button";

import estilos from "./modaldelete.module.css";

const ModalDelete = ({ onDelete, id }) => {
  const [showModal, setShowModal] = useState(true);

  const handleDelete = () => {
    axiosInstance
      .delete(`config-publication/${id}`)
      .then(() => {
        window.location.replace("/");
      })
      .catch(() => {
        toast.error("Ocorreu um erro ao deletar");
      })
      .finally(() => {
        onDelete();
      });
  };

  const modalFooter = (
    <span
      style={{
        display: "flex",
        justifyContent: "end",
        gap: "20px",
        padding: "15px",
      }}
    >
      <Button variant="contained" onClick={() => onDelete()}>
        Não
      </Button>
      <Button variant="contained" color="error" onClick={() => handleDelete()}>
        Sim
      </Button>
    </span>
  );

  return (
    <div>
      <Dialog
        visible={showModal}
        position="top"
        showHeader={false}
        footer={modalFooter}
        className={estilos.modalContainer}
        onHide={() => setShowModal(false)}
      >
        <div className={estilos.modalContent}>
          <h4>Deseja exlcuir essa publicação?</h4>
        </div>
      </Dialog>
      <ToastContainer />
    </div>
  );
};

export default ModalDelete;
