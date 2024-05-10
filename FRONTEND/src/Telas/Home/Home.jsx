import UserContext from "../../contexts/userContext";

import Navbar from "../../Components/Navbar/Navbar";
import NewPublication from "../../Components/NewPublication/NewPublication";
import Feed from "../Publi/Feed/Feed";

import estilos from "./home.module.css";
import { useContext } from "react";

const Home = () => {
  const { logged, info } = useContext(UserContext);
  return (
    <>
      <div className="container">
        <header>
          <Navbar status={logged} props={info} />
        </header>
        <main>
          {logged && <NewPublication userInfo={info} />}
          <div className={estilos.publi}>
            <Feed />
          </div>
        </main>
        <footer>
          <h1>E esse é o footer</h1>
        </footer>
      </div>
    </>
  );
};

export default Home;
