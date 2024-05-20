import { useState, useEffect, useContext } from "react";
import UserContext from "../../contexts/userContext";

import { ToastContainer, toast } from "react-toastify";

import { FaUserCircle } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";

import ModalProfileEdit from "../ModalProfileEdit/Modal/ModalProfileEdit";

import estilos from "./userarea.module.css";
import axiosInstance from "../../services/axiosConfig";

const UserArea = ({ props: info }) => {
  const { logged, info: userLoggedInfo } = useContext(UserContext);
  const [userInfo, setUserInfo] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setUserInfo(info);
  }, [info]);

  const closeModal = (sucesso) => {
    console.log(sucesso);
    if (sucesso) {
      axiosInstance.get(`users/${info.id}`).then((res) => {
        setUserInfo(res.data.Usuario[0]);
        localStorage.setItem("userInfo", JSON.stringify(res.data.Usuario[0]));
      });
    }
    setShowModal(false);
  };

  return (
    <>
      {logged && (
        <div className={estilos.container} id="container">
          <div className="" style={{ display: "flex" }}>
            {userInfo.perfil_image == null ? (
              <FaUserCircle className={estilos.userImg} />
            ) : (
              <div
                className={estilos.userImg}
                style={{ backgroundImage: `url(${userInfo.perfil_image})` }}
              ></div>
            )}
            <div className={estilos.userInfo}>
              <h1>{userInfo.name}</h1>
              <p>
                <strong>Nome de usuário:</strong> {userInfo.username}
              </p>
              {userInfo.bio ? (
                <p>
                  <strong>Sobre mim:</strong>
                  {userInfo.bio}
                </p>
              ) : (
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <p>
                    <strong>Sobre mim:</strong> Sem biografia
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className={estilos.settingsArea}>
            {userInfo.id === userLoggedInfo.id ? (
              <div className={estilos.settingsIcon}>
                <IoSettingsSharp
                  size={45}
                  className={estilos.icon}
                  onClick={() => setShowModal(true)}
                />
              </div>
            ) : undefined}
          </div>
        </div>
      )}
      {showModal && (
        <ModalProfileEdit
          show={showModal}
          onClose={(sucesso) => closeModal(sucesso)}
          props={userInfo}
        />
      )}
    </>
  );
};

export default UserArea;
