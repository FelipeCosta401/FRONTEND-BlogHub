import logo from "../../../assets/AlternativeMainLogo.png";

import estilos from "./modalBackground.module.css";

const ModalBackground = ({ action }) => {
  return (
    <>
      {action == "login" ? (
        <div className={estilos.container}>
          <img src={logo} alt="Logo do website" />
          <div className={estilos.mainContent}>
            <h2>Que bom te ver denovo!</h2>
            <p className={estilos.backgroundParagraph}>
              Faça login para aproveitar tudo que temos a oferecer!
            </p>
          </div>
        </div>
      ) : (
        <div
          className={estilos.container}
          style={{ borderRadius: "0 18px 18px 0" }}
        >
          <img src={logo} alt="Logo do website" />
          <div className={estilos.mainContent}>
            <h2>Bem vindo ao BlogHub</h2>
            <p
              className={estilos.backgroundParagraph}
              style={{ textAlign: "justify" }}
            >
              No vasto universo da blogosfera, o BlogHub se destaca como um
              ponto de encontro para mentes curiosas, ávidas por explorar uma
              variedade de tópicos fascinantes.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalBackground;
