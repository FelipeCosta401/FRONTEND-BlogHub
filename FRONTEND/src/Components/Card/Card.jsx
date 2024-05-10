import { Link } from "react-router-dom";

import { FaUserCircle } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import { FiMessageCircle } from "react-icons/fi";

import estilos from "./card.module.css";

const Card = ({ props: post, data }) => {
  return (
    <>
      <div
        className={estilos.container}
        onClick={() => {
          window.location.replace(`/post/${post.id}`);
        }}
      >
        <img src={post.publication_image} />

        <div className={estilos.cardContainer}>
          <div className={estilos.userInfo}>
            {post.user.perfil_image ? (
              <img src={post.user.perfil_image} className={estilos.userImage} />
            ) : (
              <FaUserCircle size={25} />
            )}
            <p>{post.user.username}</p>
          </div>
          <div className={estilos.cardContent}>
            <div clsasName={estilos.cardTitle}>
              <h4>{post.title}</h4>
            </div>

            <div className={estilos.cardDesc}>
              <p>{post.description}</p>
            </div>

            <div className={estilos.cardFooter}>
              <div className={estilos.cardReactions}>
                <div className={estilos.reactionsLike}>
                  <AiFillLike size={25} />
                  <p>{post.likes_count}</p>
                </div>
                <div className={estilos.reactionsComments}>
                  <FiMessageCircle size={25} />
                  <p>{post.comments.length}</p>
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
