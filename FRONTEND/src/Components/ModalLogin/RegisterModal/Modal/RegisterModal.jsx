import { useState } from "react";

import { Dialog } from "primereact/dialog";
import { IoIosCloseCircle } from "react-icons/io";

import Home from "../../../../Telas/Home/Home";
import ModalBackground from "../../ModalBackground/ModalBackground";
import RegisterForm from "../RegisterForm/RegisterForm";
import estilos from "./registerModal.module.css";

const RegisterModal = () => {
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
                <ModalBackground action="register" />
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

                  <h1 className={estilos.title}>Cadastre-se</h1>
                </div>
                <RegisterForm />
                <h4 className={estilos.registerOption}>
                  Já tem conta? <a href="/login">Entre</a>
                </h4>
              </div>
            </div>
          </Dialog>
        </div>
      </div>
    </>
  );
};

export default RegisterModal;
