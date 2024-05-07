import { useEffect, useState } from "react";
import axios from "axios";

import Card from "../../../Components/Card/Card";
import estilos from "./feed.module.css";

const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://172.16.0.19:8000/api/publication")
      .then((res) => {
        setPosts([...res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className={estilos.container}>
        <h1>Veja as publicações mais procuradas:</h1>
        {/* <button
          style={{ color: "#000" }}
          onClick={() => {
            console.log(posts);
          }}
        >
          Ver posts
        </button> */}
        <div className={estilos.cards}>
          {posts.map((post) => (
            <Card
              key={post.id}
              id={post.id}
              title={post.title}
              desc={post.desc}
              img={post.publication_image}
              user={post.user.username}
              userImg={post.userImg}
              data={post.created_at}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Feed;
