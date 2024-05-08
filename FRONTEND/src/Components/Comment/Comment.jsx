import { FaUserCircle } from "react-icons/fa";
import { MdOutlineSubdirectoryArrowRight } from "react-icons/md";
import { AiFillLike } from "react-icons/ai";

import estilos from "./comment.module.css";

const Comment = ({ props: comment }) => {
  return (
    <>
      <div className={estilos.container}>
        <div className={estilos.userInfo}>

          <div className={estilos.user}>
            <FaUserCircle size={20} />
            <p>{comment.user.username}</p>
          </div>

          <div className={estilos.postInfo}>
            <p>{comment.created_at}</p>
          </div>

        </div>

        <div className={estilos.content}>

          <div className={estilos.comment}>
            <p>{comment.message}</p>
          </div>

          {/* <div className={estilos.commentInfo}>
            <AiFillLike size={15} />
            <p>15</p>
          </div> */}

        </div>

        {/* <div className={estilos.footer}>
          <MdOutlineSubdirectoryArrowRight size={25} />
          <p>Ver 3 respostas</p>
        </div> */}

      </div>
    </>
  );
};

export default Comment;
