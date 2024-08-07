import React, { useState } from "react";
import InputEmoji from "react-input-emoji";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import "./Comentario.css";

const Comentario = (props) => {
  const [text, setText] = useState("");

  const sendComment = () => {
    updateDoc(doc(db, "Articles", props.postID), {
      comments: [
        {
          name: props.user.displayName,
          photo: props.user.photoURL,
          email: props.user.email,
          text,
        },
        ...props.comments,
      ],
    });
  };

  return (
    <div className="container">
      <div className="input">
        <img src={props.photo} alt="user" />
        <InputEmoji
          value={text}
          onChange={setText}
          cleanOnEnter
          onEnter={sendComment}
          placeholder="Add a comment..."
        />
      </div>
      {props.comments.map((comment, id) => (
        <div className="comment-container" key={id}>
          <img src={comment?.photo} alt="user" />
          <div className="content">
            <div className="header">
              <div className="info">
                <h6>{comment.name}</h6>
                <span>{comment.email}</span>
              </div>
              <img src="/Images/ellipsis.svg" alt="" />
            </div>
            <p>{comment.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comentario;
