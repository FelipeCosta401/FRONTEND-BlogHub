import { useEffect, useState } from "react";
import axios from "axios";

import Card from "../../../Components/Card/Card";
import estilos from "./feed.module.css";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [qtdPosts, setQtdPosts] = useState();

  useEffect(() => {
    axios
      .get("http://172.16.0.19:8000/api/publication")
      .then((res) => {
        setPosts([...res.data[0]]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const formatData = (date) => {
    const data = new Date(date);
    const dataFormatada = data.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    return dataFormatada;
  };

  return (
    <>
      {posts.length % 2 == 0 ? (
        <div className={estilos.cards}>
          {posts.map((post) => (
            <Card
              key={post.id}
              id={post.id}
              title={post.title}
              desc={post.description}
              img={post.publication_image}
              user={post.user.username}
              userImg={post.user.perfil_image}
              data={formatData(post.created_at)}
            />
          ))}
        </div>
      ) : (
        <div className={estilos.cards} style={{ columnCount: "3" }}>
          {posts.map((post) => (
            <Card
              key={post.id}
              id={post.id}
              title={post.title}
              desc={post.description}
              img={post.publication_image}
              user={post.user.username}
              userImg={post.user.perfil_image}
              data={formatData(post.created_at)}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default Feed;
