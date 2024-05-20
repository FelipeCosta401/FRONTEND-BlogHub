import { useState } from "react";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import estilos from "./option.module.css";

const Option = ({ label, value, onSave, id }) => {
  const [newValue, setNewValue] = useState(value);
  return (
    <>
      <div className={estilos.container}>
        <div className={estilos.group}>
          <h4>{label}</h4>
          {id === "perfil_image" && (
            <div
              className={estilos.userImg}
              style={{ backgroundImage: `url(${newValue})` }}
            ></div>
          )}
          <TextField
            label={label}
            autoFocus
            onChange={(e) => setNewValue(e.target.value)}
            value={newValue}
            variant="outlined"
            className={estilos.input}
          />
        </div>
        <div className={estilos.group}>
          <Button variant="contained" onClick={() => onSave(id, newValue)}>
            Atualizar
          </Button>
        </div>
      </div>
    </>
  );
};

export default Option;
