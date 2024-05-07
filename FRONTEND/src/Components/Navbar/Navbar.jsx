import { useState } from "react";

import { Link } from "react-router-dom";

import { FaSearch, FaRegUserCircle, FaBell } from "react-icons/fa";

import SidebarComponent from "../SidebarComponent/SidebarComponent";
import Logo from "../../assets/MainLogo.png";
import estilos from "./navbar.module.css";

const Navbar = ({ status }) => {
  const [sidebar, setSidebar] = useState(false);
  return (
    <>
      <div className={estilos.container}>
        <div className={estilos.logo}>
          <Link to="/">
            <img src={Logo} alt="" />
          </Link>
        </div>
        <div className={estilos.searchField}>
          <input
            type="text"
            name="searchInput"
            id="searchInput"
            placeholder="O que você está procurando?"
          />
          <FaSearch size={35} className={estilos.searchIcon} />
        </div>
        <div className={estilos.loginContainer}>
          {status && (
            <div className={estilos.loginContainerUser}>
              <div className={estilos.accountIcon}>
                <FaBell size={55} color={"gold"} />
              </div>
              <div className={estilos.loginIcon}>
                <FaRegUserCircle
                  size={55}
                  onClick={() => setSidebar(!sidebar)}
                />
              </div>
            </div>
          )}
          {!status && (
            <Link to="/login" className={estilos.loginIcon}>
              <FaRegUserCircle size={55} />
            </Link>
          )}
        </div>
        {sidebar && <SidebarComponent onClose={() => setSidebar(false)} />}
      </div>
    </>
  );
};

export default Navbar;
