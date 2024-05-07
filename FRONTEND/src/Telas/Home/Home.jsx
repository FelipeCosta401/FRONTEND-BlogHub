import Navbar from "../../Components/Navbar/Navbar";
import Feed from "../Publi/Feed/Feed";

import estilos from "./home.module.css"

const Home = () => {
  return (
    <>
      <div className="container">
        <header>
          <Navbar />
        </header>
        <main>
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
