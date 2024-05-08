import { Link } from "react-router-dom";

import { FaUserCircle } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import { FiMessageCircle } from "react-icons/fi";

import estilos from "./card.module.css";

const Card = ({ id, title, desc, img, user, userImg, data }) => {
  return (
    <>
      <div
        className={estilos.container}
        onClick={() => {
          window.location.replace(`/post/${id}`);
        }}
      >
        <img src={img} />

        <div className={estilos.cardContainer}>
          <div className={estilos.userInfo}>
            {userImg ? (
              <img src={userImg} className={estilos.userImage} />
            ) : (
              <FaUserCircle size={25} />
            )}
            <p>{user}</p>
          </div>
          <div className={estilos.cardContent}>
            <div clsasName={estilos.cardTitle}>
              <h4>{title}</h4>
            </div>

            <div className={estilos.cardDesc}>
              <p>{desc}</p>
            </div>

            <div className={estilos.cardFooter}>
              <div className={estilos.cardReactions}>
                <div className={estilos.reactionsLike}>
                  <AiFillLike size={25} />
                  <p>150</p>
                </div>
                <div className={estilos.reactionsComments}>
                  <FiMessageCircle size={25} />
                  <p>4</p>
                </div>
              </div>
              <div className={estilos.cardInfo}>
                <p>{data}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
