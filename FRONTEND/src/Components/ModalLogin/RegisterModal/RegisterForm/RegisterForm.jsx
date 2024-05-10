import { useState } from "react";
import axios from "axios";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import estilos from "./registerForm.module.css";

const FormModal = () => {
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    username: "",
    birthdate: "",
  });
  const [confPassword, setConfPassword] = useState("");

  const userRegister = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const register = (e) => {
    e.preventDefault();
    if (
      !newUser.name ||
      !newUser.email ||
      !newUser.password ||
      !newUser.username ||
      !newUser.birthdate
    ) {
      toast.error("Preencha todos os campos");
    } else if (confPassword !== newUser.password) {
      toast.warn("As senhas não condizem!");
    } else {
      axios
        .post("http://172.16.0.19:8000/api/user", {
          name: newUser.name,
          email: newUser.email,
          password: newUser.password,
          username: newUser.username,
          birthdate: newUser.birthdate,
        })
        .then((res) => {
          toast.success("Cadastrado com sucesso!");

          setNewUser({
            name: "",
            email: "",
            password: "",
            username: "",
            birthdate: "",
          });
        })
        .catch((res) => {
          toast.error(res.message);
        });
    }
  };

  return (
    <>
      <div className={estilos.container}>
        <form className={estilos.form} onSubmit={register}>
          <div className={estilos.input}>
            <TextField
              id="outlined-basic"
              label="Nome"
              variant="outlined"
              name="name"
              value={newUser.name}
              onChange={userRegister}
              style={{ width: "100%" }}
            />
          </div>
          <div className={estilos.input}>
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              name="email"
              value={newUser.email}
              onChange={userRegister}
              style={{ width: "100%" }}
            />
          </div>

          <div className={estilos.input}>
            <TextField
              id="outlined-basic"
              label="Nome de usuário"
              variant="outlined"
              name="username"
              value={newUser.username}
              onChange={userRegister}
              style={{ width: "100%" }}
            />
          </div>
          <div className={estilos.input}>
            <TextField
              id="outlined-basic"
              label="Senha"
              name="password"
              value={newUser.password}
              onChange={userRegister}
              variant="outlined"
              style={{ width: "100%" }}
            />
          </div>

          <div className={estilos.input}>
            <TextField
              id="outlined-basic"
              label="Confirmar senha"
              name="confPassword"
              value={confPassword}
              onChange={(e) => setConfPassword(e.target.value)}
              variant="outlined"
              style={{ width: "100%" }}
            />
          </div>
          <div className={estilos.input}>
            <TextField
              id="outlined-basic"
              label="Data de nascimento"
              variant="outlined"
              name="birthdate"
              value={newUser.birthdate}
              onChange={userRegister}
              style={{ width: "100%" }}
            />
          </div>

          <div className={estilos.loginButton}>
            <Button type="submit" variant="contained" style={{ width: "100%" }}>
              Criar conta
            </Button>
          </div>
        </form>

        <ToastContainer />
      </div>
    </>
  );
};

export default FormModal;
