import React, { useState, useCallback } from "react";
import InputEmoji from "react-input-emoji";
import { doc, updateDoc, Timestamp, arrayRemove, getDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import "./Comentario.css";
import { toast } from "react-toastify";

const Comentario = (props) => {
  const [text, setText] = useState("");

  const sendComment = () => {
    updateDoc(doc(db, "posts", props.documentId), {
      comments: [
        {
          name: props.user.name,
          photoURL: props.user.photoURL,
          email: props.user.email,
          text,
          date: Timestamp.now(),
        },
        ...props.comments,
      ],
    });
  };

  const [loading, setLoading] = useState(false);

  const handleDeleteComment = useCallback(
    async (postId, index) => {
      setLoading(true);
      try {
        const postRef = doc(db, "posts", postId);
        const postSnap = await getDoc(postRef);
  
        if (postSnap.exists()) {
          const postData = postSnap.data();
          const comments = postData.comments || [];

          if (index >= 0 && index < comments.length) {
            comments.splice(index, 1);
            await updateDoc(postRef, {
              comments: comments,
            });
  
            toast("Comentário deletado");
          } else {
            console.error("Índice inválido para o comentário");
          }
        } else {
          console.error("Post não encontrado");
        }
      } catch (error) {
        console.error("Error deleting comment:", error);
      } finally {
        setLoading(false);
      }
    },
    [setLoading]
  );

  return (
    <div className="container-comentario">
      <div className="input">
        <img src={props.user.photoURL} alt="user" />
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
          <img src={comment?.photoURL} alt="user" />
          <div className="content-comentario">
            <div className="header-comentario">
              <div className="info">
                <h6>{comment.name}</h6>
                <span>
                  {new Date(comment.date.seconds * 1000).toLocaleString()}
                </span>
              </div>
              {props.user.email === comment.email && (
                <div className="delete-comment">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQubXSwM5i62z5ZsAhDsg1db5y7_DPEjLPRYQ&s"
                    alt=""
                    onClick={() => handleDeleteComment(props.documentId, id)}
                  />
                </div>
              )}
            </div>
            <p style={{ fontSize: "15px" }}>{comment.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comentario;
