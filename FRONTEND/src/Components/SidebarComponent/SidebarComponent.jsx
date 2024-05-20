import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../contexts/userContext";

import { Sidebar } from "primereact/sidebar";

import { FaUserCircle } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { IoIosLogOut } from "react-icons/io";

import estilos from "./sidebar.module.css";

const SidebarComponent = ({ onClose }) => {
  const { logged, info } = useContext(UserContext);
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const handleLogOut = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userInfo");
    window.location.replace("/");
  };

  return (
    <>
      {logged && (
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
                {info.perfil_image ? (
                  <div
                    className={estilos.userImg}
                    style={{ backgroundImage: `url(${info.perfil_image})` }}
                  ></div>
                ) : (
                  <FaUserCircle size={50} />
                )}
              </div>
              <div className={estilos.userInfo}>
                <h2>{info.username}</h2>
                <p>{info.name}</p>
              </div>
              <div className={estilos.userSettings}>
                <FaGear size={50} />
              </div>
            </header>
            <main className={estilos.sidebarMain}>
              <div className={estilos.sidebarItens}>
                <Link
                  to={`/profile/${info.id}`}
                  style={{ textDecoration: "none", alignItems: "center" }}
                >
                  <div className={estilos.sidebarItem}>
                    <h3>Meu perfil</h3>
                    <FaUserCircle size={35} color={"#fff"} />
                  </div>
                </Link>
              </div>
            </main>
            <footer className={estilos.sidebarFooter}>
              <div
                className={estilos.logOutButton}
                onClick={() => handleLogOut()}
              >
                <IoIosLogOut size={35} color={"red"} />
                <p>Sair</p>
              </div>
            </footer>
          </Sidebar>
        </div>
      )}
    </>
  );
};

export default SidebarComponent;
