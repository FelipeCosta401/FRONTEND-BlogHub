import { useContext, useEffect, useState } from "react";
import axiosInstance from "../../../services/axiosConfig";

import { ToastContainer, toast } from "react-toastify";
import { Dialog } from "primereact/dialog";

import { IoIosCloseCircle } from "react-icons/io";
import { FaLongArrowAltLeft } from "react-icons/fa";

import Options from "../Options/Options";
import Option from "../Option/Option";
import estilos from "./modalprofileedit.module.css";

const ModalProfileEdit = ({ show, onClose, props: info }) => {
  const [option, setOption] = useState("Options");

  const handleSave = (id, value) => {
    if (value === "") {
      toast.error("Preencha o campo corretamente!");
    } else {
      axiosInstance
        .patch("config-user", {
          [id]: value,
        })
        .then((res) => {
          onClose(true);
        })
        .catch((err) => {
          console.log(err);
          toast.error("Houve um erro na hora de atualizar!");
        });
    }
  };

  return (
    <>
      <Dialog
        visible={show}
        position="top"
        showHeader={false}
        className={estilos.modalContainer}
        onHide={() => onClose()}
      >
        <div className={estilos.modalContent}>
          {option !== "Options" ? (
            <div className={estilos.header}>
              <FaLongArrowAltLeft
                size={35}
                className={estilos.backIcon}
                onClick={() => setOption("Options")}
              />
              <IoIosCloseCircle
                size={35}
                className={estilos.icon}
                onClick={() => onClose()}
              />
            </div>
          ) : (
            <div style={{ textAlign: "end" }}>
              <IoIosCloseCircle
                size={35}
                className={estilos.icon}
                onClick={() => onClose()}
              />
            </div>
          )}
          {option === "Options" && (
            <Options props={info} option={(opt) => setOption(opt)} />
          )}
          {option === "name" && (
            <Option
              id="name"
              label="Nome"
              value={info.name}
              onSave={(id, value) => handleSave(id, value)}
            />
          )}
          {option === "username" && (
            <Option
              id="username"
              label="Nome de usuário"
              value={info.username}
              onSave={(id, value) => handleSave(id, value)}
            />
          )}
          {option === "bio" && (
            <Option
              id="bio"
              label="Biografia"
              value={info.bio}
              onSave={(id, value) => handleSave(id, value)}
            />
          )}
          {option === "perfil_image" && (
            <Option
              id="perfil_image"
              label="Foto atual"
              value={info.perfil_image}
              onSave={(id, value) => handleSave(id, value)}
            />
          )}
        </div>
      </Dialog>
      <ToastContainer />
    </>
  );
};

export default ModalProfileEdit;
