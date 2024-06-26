import { useEffect, useState } from "react";
import axiosInstace from "../../../services/axiosConfig";

import Card from "../../../Components/Card/Card";
import estilos from "./feed.module.css";

const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axiosInstace
      .get("publication")
      .then((res) => {
        // console.log(res.data);
        setPosts([...res.data]);
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
      <div className={estilos.cards}>
        {posts.map((post) => (
          <Card key={post.id} props={post} data={formatData(post.created_at)} />
        ))}
      </div>
    </>
  );
};

export default Feed;
