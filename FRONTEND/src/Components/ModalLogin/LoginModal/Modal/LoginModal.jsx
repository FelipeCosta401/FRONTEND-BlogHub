import { useState } from "react";

import { Dialog } from "primereact/dialog";
import { IoIosCloseCircle } from "react-icons/io";

import Home from "../../../../Telas/Home/Home";
import ModalBackground from "../../ModalBackground/ModalBackground";
import LoginForm from "../LoginForm/LoginForm";
import estilos from "./loginModal.module.css";

const LoginModal = () => {
  const [visible, setVisible] = useState(true);

  const closeModal = () => {
    setTimeout(function closeModal() {
      window.location.replace("/");
    }, 100);
  };
  return (
    <>
      <div className={estilos.container}>
        <div className={estilos.background}>
          <Home />
        </div>
        <div>
          <Dialog
            visible={visible}
            className={estilos.modalContainer}
            showHeader={false}
          >
            <div className={estilos.modalContent}>
              <div className={estilos.modalContentBackground}>
                <ModalBackground action="login" />
              </div>
              <div className={estilos.modalContentForm}>
                <div className={estilos.header}>
                  <IoIosCloseCircle
                    size={45}
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setVisible(false);
                      closeModal();
                    }}
                  />
                </div>
                <h1 className={estilos.title}>Faça o login</h1>
                <LoginForm />
                <h4 className={estilos.registerOption}>
                  Não tem login? <a href="/cadastro">Cadastre-se</a>
                </h4>
              </div>
            </div>
          </Dialog>
        </div>
      </div>
    </>
  );
};

export default LoginModal;
