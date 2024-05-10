import { useState } from "react";

import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";

import { FaUserCircle, FaFolder, FaStar } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { AiFillLike } from "react-icons/ai";
import { BiSolidMessageRounded } from "react-icons/bi";
import { IoIosLogOut } from "react-icons/io";

import estilos from "./sidebar.module.css";

const SidebarComponent = ({ onClose }) => {
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const handleLogOut = () =>{
    localStorage.removeItem("userToken")
    window.location.replace("/")
  }

  return (
    <>
      <div className="container">
        <Sidebar
          visible={sidebarVisible}
          position="right"
          showCloseIcon={false}
          onHide={onClose}
          className={estilos.sidebar}
        >
          <header className={estilos.sidebarHeader}>
            <div className={estilos.userIcon}>
              <FaUserCircle size={50} />
            </div>
            <div className={estilos.userInfo}>
              <h2>Usuário</h2>
              <p>Nome do usuário</p>
            </div>
            <div className={estilos.userSettings}>
              <FaGear size={50} />
            </div>
          </header>
          <main className={estilos.sidebarMain}>
            <div className={estilos.sidebarItens}>
              <div className={estilos.sidebarItem}>
                <h3>Minha publicações</h3>
                <FaFolder size={35} color={"#fff"} />
              </div>
              <div className={estilos.sidebarItem}>
                <h3>Curtidas</h3>
                <AiFillLike size={35} color={"#fff"} />
              </div>
              <div className={estilos.sidebarItem}>
                <h3>Favoritos</h3>
                <FaStar size={35} color={"#fff"} />
              </div>
              <div className={estilos.sidebarItem}>
                <h3>Comentários</h3>
                <BiSolidMessageRounded size={35} color={"#fff"} />
              </div>
            </div>
          </main>
          <footer className={estilos.sidebarFooter}>
            <div className={estilos.logOutButton} onClick={() => handleLogOut()}>
              <IoIosLogOut size={35} color={"red"} />
              <p>Sair</p>
            </div>
          </footer>
        </Sidebar>
      </div>
    </>
  );
};

export default SidebarComponent;
