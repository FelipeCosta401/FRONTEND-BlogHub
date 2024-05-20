import { useState } from "react";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { IoIosCloseCircle } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import estilos from "./newcomment.module.css";
import axiosInstance from "../../../services/axiosConfig";

const NewComment = ({ onClose, id, userId, onUpdate }) => {
  const [message, setMessage] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance
      .post("comment", {
        message,
        publication_id: id,
        user_id: userId,
      })
      .then(() => {
        toast.success("Comentário publicado!");
        onUpdate();
        onClose();
      })
      .finally(() => toast.success("Comentário publicado!"));
  };
  return (
    <>
      <div className={estilos.container}>
        <form className={estilos.form} onSubmit={handleSubmit}>
          <TextField
            id="standard-multiline-flexible"
            label="Mensagem"
            multiline
            maxRows={4}
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            variant="standard"
            className={estilos.input}
          />

          <Button type="submit" variant="outlined" className={estilos.input}>
            Comentar
          </Button>
        </form>
        <IoIosCloseCircle
          size={35}
          className={estilos.closeIcon}
          onClick={() => onClose()}
        />
        <ToastContainer />
      </div>
    </>
  );
};

export default NewComment;
