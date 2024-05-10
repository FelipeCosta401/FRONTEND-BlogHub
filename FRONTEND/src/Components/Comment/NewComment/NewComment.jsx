import { useState } from "react";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { IoIosCloseCircle } from "react-icons/io";

import estilos from "./newcomment.module.css";

const NewComment = ({ onClose }) => {
  const [message, setMessage] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
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
      </div>
    </>
  );
};

export default NewComment;
