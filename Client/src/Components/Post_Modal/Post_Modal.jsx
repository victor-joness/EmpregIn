import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import ReactPlayer from "react-player";
import { db } from "../../../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

import "./Post_Modal.css";
import { toast } from "react-toastify";
import uuid from "react-uuid";

const Post_Modal = (props) => {
  const user = useSelector((state) => state.user.value);
  const [text, setText] = useState("");
  const sharedImage = useRef();
  const [image, setImage] = useState("");
  const sharedVideo = useRef();
  const [video, setVideo] = useState("");

  let textURL = text.match(
    new RegExp(
      "([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?(/.*)?"
    )
  );

  const reset = () => {
    setText("");
    setImage();
    setVideo();
  };

  const handleURLInput = (type) => {
    if (type === "image") {
      const url = prompt(`Coloque a URL da ${type}:`);
      setImage(url);
    } else if (type === "video") {
      const url = prompt(`Coloque a URL do ${type}:`);
      setVideo(url);
    }
  };

  const postArticleHandler = (e) => {
    if (e.target === e.currentTarget) {
      addDoc(collection(db, "posts"), {
        id: uuid(),
        user: {
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
        },
        publication_date: Timestamp.now(),
        timestamp: Timestamp.now(),
        sharedImage: image,
        sharedVideo: video,
        description: text,
        comments: 0,
        likes: 0,
      }).then(() => {
        toast.success("Publicação feita com sucesso!");
      });
    }
    reset();
    props.setIsOpenModel(false);
  };

  return (
    <section className="container-post-modal">
      <article className="content-post-modal">
        <div className="header-post-modal">
          <h2>Criar um novo post</h2>
          <button
            onClick={() => {
              reset();
              props.setIsOpenModel(false);
            }}
          >
            <img src="/Images/close.svg" alt="close" />
          </button>
        </div>

        <div className="shared-content-post-modal">
          <div className="user-info-post-modal">
            <img
              src={user.photoURL ? user.photoURL : "/Images/user.svg"}
              alt="user"
            />
            <span>{user.displayName}</span>
          </div>

          <div className="description-post-modal">
            <textarea
              value={text}
              onChange={(e) => setText(e.currentTarget.value)}
              autoFocus={true}
              placeholder="Sobre o que você quer falar?"
            ></textarea>
          </div>

          <div className="actions-post-modal">
            <div className="editor-post-modal">
              <div className="add-buttons-post-modal">
                <button
                  disabled={image || video}
                  onClick={() => handleURLInput("image")}
                >
                  <img src="/Images/photo-icon.svg" alt="Adicionar uma foto" />
                </button>

                <button
                  disabled={image || video}
                  onClick={() => handleURLInput("video")}
                >
                  <img src="/Images/video-icon.svg" alt="Adicionar um vídeo" />
                </button>

                <button disabled={image || video}>
                  <img
                    src="/Images/document.svg"
                    alt="Adicionar um documento"
                  />
                </button>
              </div>

              <div className="share-comment-post-modal">
                <button>
                  <img src="/Images/comment.svg" alt="Todos os comentários" />
                  botão de teste
                </button>
              </div>
            </div>

            <button
              disabled={text.trim() === "" && !image && !video}
              className="post"
              onClick={(e) => postArticleHandler(e)}
            >
              Postar
            </button>
          </div>
        </div>
      </article>
    </section>
  );
};

export default Post_Modal;
