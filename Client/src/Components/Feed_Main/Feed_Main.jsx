import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../firebase";
import ReactPlayer from "react-player";
import fuzzyTime from "fuzzy-time";
import "./Feed_Main.css";

import Post_Modal from "../Post_Modal/Post_Modal";

const Feed_Main = () => {
  const [user, setUser] = useState(useSelector((state) => state.user.value));
  const [posts, setPosts] = useState([]);
  const [isOpenModel, setIsOpenModel] = useState(false);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const auth = getAuth();
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          name: currentUser.displayName,
          email: currentUser.email,
          photo: currentUser.photoURL,
        });

        const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));

        const unsubscribeSnapshot = onSnapshot(q, (querySnapshot) => {
          const postsData = [];
          querySnapshot.forEach((doc) => {
            postsData.push({ id: doc.id, ...doc.data() });
          });
          setPosts(postsData);
        });

        return () => {
          unsubscribeSnapshot();
        };
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribeAuth();
    };
  }, []);

  const handleDelete = useCallback(
    async (id) => {
      setLoading(true);
      await deleteDoc(doc(db, "posts", id));
      setLoading(false);
    },
    [setLoading]
  );

  const handleEdit = useCallback(
    async (id, title) => {
      setLoading(true);
      await updateDoc(doc(db, "posts", id), { title });
      setLoading(false);
    },
    [setLoading]
  );

  return (
    <div className="container_Feed_Main ">
      <div className="share-box">
        <div>
          {user.photoURL && <img src={user.photoURL} alt="user" />}
          <button onClick={() => setIsOpenModel(true)}>Começar um post</button>
        </div>
        <div>
          <button>
            <img src="/Images/photo-icon.svg" alt="photo" />
            <span>Fotos</span>
          </button>
          <button>
            <img src="/Images/video-icon.svg" alt="video" />
            <span>Videos</span>
          </button>
          <button>
            <img src="/Images/job-icon.svg" alt="event" />
            <span>Eventos</span>
          </button>
          <button>
            <img src="./Images/article-icon.svg" alt="article" />
            <span>Escrever Artigo</span>
          </button>
        </div>
      </div>

      {posts.length > 0 ? (
        <div>
          {posts.map((post) => (
            <div key={post.id} className="article common-card">
              <div className="actor">
                <a>
                  <img src={post.user.photo} alt="user" />
                  <div className="info">
                    <h6>{post.user.name}</h6>
                    <span>{post.user.email}</span>
                    <span>
                      {
                        new Date(post.timestamp.seconds * 1000).toLocaleString()
                      }
                    </span>
                  </div>
                </a>
                <button>
                  <img src="/Images/ellipsis.svg" alt="options" />
                </button>
              </div>

              <div className="description">
                <p>{post.description}</p>
              </div>

              <div className="shared-img">
                {post.sharedImage && <img src={post.sharedImage} alt="Imagem compartilhada" />}
                {post.sharedVideo && <ReactPlayer url={post.sharedVideo} width="100%" />}
              </div>

              <div className="social-contents">
                <button>
                  <img src="/Images/like.svg" alt="like" />
                  <span>Curtir</span>
                </button>

                <button>
                  <img src="/Images/comment.svg" alt="comment" />
                  <span>Comentar</span>
                </button>

                <button>
                  <img src="/Images/share.svg" alt="share" />
                  <span>Compartilhar</span>
                </button>

                <button>
                  <img src="/Images/send.svg" alt="send" />
                  <span>Enviar</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Sem Posts disponível</p>
      )}

      {isOpenModel && (
        <Post_Modal
          isOpenModel={isOpenModel}
          setIsOpenModel={setIsOpenModel}
          setLoading={setLoading}
        />
      )}
    </div>
  );
};

export default Feed_Main;
