import { FaLongArrowAltRight } from "react-icons/fa";

import estilos from "./options.module.css";

const Options = ({ props: info, option, id }) => {
  return (
    <>
      <div className={estilos.main}>
        <div className={estilos.userPreview}>
          <div
            className={estilos.userImg}
            style={{ backgroundImage: `url(${info.perfil_image})` }}
          ></div>
          <h3>{info.name}</h3>
          <p>{info.username}</p>
        </div>
        <div className={estilos.options}>
          <div className={estilos.option} onClick={() => option("name")}>
            <h4>Nome</h4>
            <FaLongArrowAltRight size={25} />
          </div>
          <div className={estilos.option} onClick={() => option("username")}>
            <h4>Nome de usuário</h4>
            <FaLongArrowAltRight size={25} />
          </div>
          <div className={estilos.option} onClick={() => option("bio")}>
            <h4>Biografia</h4>
            <FaLongArrowAltRight size={25} />
          </div>
          <div
            className={estilos.option}
            onClick={() => option("perfil_image")}
          >
            <h4>Foto do perfil</h4>
            <FaLongArrowAltRight size={25} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Options;
