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
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../firebase";
import ReactPlayer from "react-player";
import "./Feed_Main.css";
import Comentario from "../Comentario/Comentario";
import Post_Modal from "../Post_Modal/Post_Modal";

const Feed_Main = () => {
  const user = useSelector((state) => state.user);

  const [posts, setPosts] = useState([]);
  const [isOpenModel, setIsOpenModel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showComments, setShowComments] = useState([]);

  useEffect(() => {
    
    const auth = getAuth();
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));

        const unsubscribeSnapshot = onSnapshot(q, (querySnapshot) => {
          const postsData = [];
          querySnapshot.forEach((doc) => {
            postsData.push({ id: doc.id, id_document: doc.id, ...doc.data() });
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

  console.log(user);

  const fetchLikes = async (postDocumentId, likes) => {
    const userLike = { name: user.name, email: user.email, photoURL: user.photoURL };

    try {
      const updatedLikes = likes.some((l) => l.email === user.email)
        ? likes.filter((l) => l.email !== user.email)
        : [userLike, ...likes];

      await updateDoc(doc(db, "posts", postDocumentId), { likes: updatedLikes });
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  const handleDelete = useCallback(
    async (id) => {
      setLoading(true);
      try {
        await deleteDoc(doc(db, "posts", id));
      } catch (error) {
        console.error("Error deleting post:", error);
      } finally {
        setLoading(false);
      }
    },
    [setLoading]
  );

  const handleEdit = useCallback(
    async (id, title) => {
      setLoading(true);
      try {
        await updateDoc(doc(db, "posts", id), { title });
      } catch (error) {
        console.error("Error editing post:", error);
      } finally {
        setLoading(false);
      }
    },
    [setLoading]
  );

  const handleAddComment = async (postId, newComment) => {
    console.log(postId);
    try {
      const postRef = doc(db, "posts", postId);
      const postDoc = await getDoc(postRef);

      if (postDoc.exists()) {
        const postData = postDoc.data();
        const updatedComments = [...(postData.comments || []), newComment];
        await updateDoc(postRef, { comments: updatedComments });
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  console.log(user);

  return (
    <div className="container_Feed_Main">
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
                      {new Date(post.timestamp.seconds * 1000).toLocaleString()}
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
                {post.sharedImage && (
                  <img src={post.sharedImage} alt="Imagem compartilhada" />
                )}
                {post.sharedVideo && (
                  <ReactPlayer url={post.sharedVideo} width="100%" />
                )}
              </div>

              <div className="SocialContents">
                <p>{post.likes ? post.likes.length : 0} Likes </p>
                <p
                  onClick={() => setShowComments((prev) =>
                    prev.includes(post.id)
                      ? prev.filter((id) => id !== post.id)
                      : [...prev, post.id]
                  )}
                >
                  {post.comments ? post.comments.length : 0} <a style={{ cursor: "pointer" }}>Comentários</a>
                </p>
              </div>

              <div className="social-actions">
                <button
                  className={`like-button ${
                    post.likes?.some((l) => l.email === user.email) ? "active" : ""
                  }`}
                  onClick={() => fetchLikes(post.id_document, post.likes || [])}
                >
                  <img
                    className="like-icon"
                    src={
                      post.likes?.some((l) => l.email === user.email)
                        ? "/Images/like-verde.svg"
                        : "/Images/like.svg"
                    }
                    alt="like"
                  />
                  <span>Like</span>
                </button>

                <button
                  className="comment-button"
                  onClick={() => setShowComments((prev) =>
                    prev.includes(post.id)
                      ? prev.filter((id) => id !== post.id)
                      : [...prev, post.id]
                  )}
                >
                  <img src="/Images/comment.svg" alt="comment" />
                  <span>Comentário</span>
                </button>

                <button className="share-button">
                  <img src="/Images/share.svg" alt="share" />
                  <span>Compartilhar</span>
                </button>

                <button className="send-button">
                  <img src="/Images/send.svg" alt="send" />
                  <span></span>
                </button>
              </div>
              {showComments.includes(post.id) && (
                  <Comentario
                    photo={user?.Img}
                    comments={post.comments || []}
                    user={user}
                    postID={post.id}
                    onAddComment={handleAddComment}
                    documentId={post.id_document}
                  />
                )}
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