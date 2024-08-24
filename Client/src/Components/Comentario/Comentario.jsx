import React, { useState } from "react";
import InputEmoji from "react-input-emoji";
import { doc, updateDoc , Timestamp} from "firebase/firestore";
import { db } from "../../../firebase";
import "./Comentario.css";

const Comentario = (props) => {
  const [text, setText] = useState("");

  const sendComment = () => {
    console.log(text);
    console.log(props);
    updateDoc(doc(db, "posts", props.documentId), {
      comments: [
        {
          name: props.user.name,
          photo: props.user.photo,
          email: props.user.email,
          text,
          date: Timestamp.now(),
        },
        ...props.comments,
      ],
    });
  };

  return (
    <div className="container-comentario">
      <div className="input">
        <img src={props.user.photo} alt="user" />
        <InputEmoji
          value={text}
          onChange={setText}
          cleanOnEnter
          onEnter={sendComment}
          placeholder="Adicionar um comentário"
        />
      </div>
      {props.comments.map((comment, id) => (
        <div className="comment-container" key={id}>
          <img src={comment?.photo} alt="user" />
          <div className="content-comentario">
            <div className="header-comentario">
              <div className="info">
                <h6>{comment.name}</h6>
                <span>{new Date(comment.date.seconds * 1000).toLocaleString()}</span>
              </div>
              <img src="/Images/ellipsis.svg" alt="" />
            </div>
            <p style={{fontSize: "15px"}}>{comment.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comentario;
