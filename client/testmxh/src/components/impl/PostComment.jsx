"use client"

import { useEffect, useState } from "react"
import "./PostComment.css"
import avatar from "../../assets/Images/default-avatar.jpg";
import axios from "axios";

// Comment component
const Comment = ({ comment, currentUserAvatar }) => (
  <div className="post-comment">
    <img
      className="comment-avatar"
      src={comment.user?.profileImageUrl || avatar}
      alt={`${comment.user?.firstName || "User"} avatar`}
    />
    <div className="comment-content">
      <div className="comment-bubble">
        <strong>{comment.user ? `${comment.user.firstName} ${comment.user.lastName}` : "Unknown User"}</strong>
        <p>{comment.content}</p>
      </div>
      <div className="comment-actions">
        <span>Thích</span>
        <span>Phản hồi</span>
        <span className="comment-time">{new Date(comment.createAt).toLocaleDateString("vi-VN")}</span>
      </div>
    </div>
  </div>
)

const Post = ({ post, currentUserAvatar, onAddComment }) => {
  const reactions = [
    { id: 1, type: "like", icon: "👍" },
    { id: 2, type: "love", icon: "❤️" },
    { id: 3, type: "haha", icon: "😆" },
    { id: 4, type: "sad", icon: "😢" },
    { id: 5, type: "angry", icon: "😠" },
  ];

  const [hovering, setHovering] = useState(false);
  const [userReaction, setUserReaction] = useState(post.userReaction || null);
  const [likesCount, setLikesCount] = useState(post.likes || 0);
  const [commentText, setCommentText] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [reactionSummary, setReactionSummary] = useState("");

  useEffect(() => {
    console.log("Dữ liệu post:", post);
    const userId = localStorage.getItem("idUser");
    const fetchUserReaction = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/posts/${post.id}/${userId}`);
        setUserReaction(res.data);
      } catch (err) {
        console.error("Failed to fetch user reaction", err);
        setUserReaction(null);
      }
    };

    fetchUserReaction();
  }, [post.id]);

  const sendReaction = async (interactId) => {
    const userId = localStorage.getItem("idUser");
    const isSameReaction = userReaction === interactId;
    const newReaction = isSameReaction ? null : interactId;

    try {
      const endpoint = `http://localhost:8080/api/posts/${post.id}/react`;

      if (newReaction) {
        await axios.post(endpoint, null, {
          params: { userId, interactId: newReaction },
        });
      } else {
        await axios.delete(endpoint, {
          params: { userId },
        });
      }

      setUserReaction(newReaction);

      const res = await axios.get(`http://localhost:8080/api/posts/${post.id}/reactions`);
      setReactionSummary(res.data);
      setLikesCount(
        (res.data.like || 0) +
        (res.data.love || 0) +
        (res.data.haha || 0) +
        (res.data.sad || 0) +
        (res.data.angry || 0)
      );
    } catch (err) {
      console.error("Lỗi khi gửi cảm xúc:", err);
    }
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      onAddComment(post.id, commentText);
      setCommentText("");
    }
  };

  const hasComments = post.commentList && post.commentList.length > 0;

  return (
    <div className="post-card">
      <div className="post-header">
        <img
          className="post-avatar"
          src={post.user?.profileImageUrl || avatar}
          alt={`${post.user?.firstName || "User"} avatar`}
        />
        <div className="post-user-info">
          <strong>{post.user ? `${post.user.firstName} ${post.user.lastName}` : "Unknown User"}</strong>
          <div className="post-meta">
            <span className="timestamp">{new Date(post.createAt).toLocaleDateString("vi-VN")}</span>
            <i className="fas fa-globe-americas privacy-icon"></i>
          </div>
        </div>
        <i className="fas fa-ellipsis-h post-options"></i>
      </div>

      <div className="post-content">
        {post.content && post.content.split("\n").map((line, i) => <p key={i}>{line}</p>)}
      </div>

      {post.imageUrl && (
        <div className="post-image">
          <img src={post.imageUrl || "/placeholder.svg"} alt="Post image" />
        </div>
      )}

      <div className="post-reactions">
        {likesCount > 0 && (
          <>
            <i className="far fa-thumbs-up"></i> {likesCount} người đã bày tỏ cảm xúc
          </>
        )}
      </div>

      <div
        className="post-actions"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        style={{ position: "relative" }}
      >
        {hovering && (
          <div className="reaction-popup">
            {reactions.map((r) => (
              <div
                key={r.id}
                className="reaction-icon"
                title={r.type}
                onClick={() => {
                  sendReaction(r.id);
                  setHovering(false);
                }}
              >
                {r.icon}
              </div>
            ))}
          </div>
        )}

        <span
          onClick={() => {
            // Nếu đã có cảm xúc, bấm lại sẽ xóa
            sendReaction(userReaction);
          }}
          style={{
            color: userReaction ? "#1877f2" : "inherit",
            fontWeight: userReaction ? "bold" : "normal",
            cursor: "pointer",
          }}
        >
          {userReaction
            ? reactions.find((r) => r.id === userReaction)?.icon || "👍"
            : <i className="far fa-thumbs-up"></i>}{" "}
          {userReaction
            ? reactions.find((r) => r.id === userReaction)?.type
            : "Thích"}
        </span>

        <span onClick={() => setShowComments(!showComments)} style={{ cursor: "pointer" }}>
          <i className="far fa-comment"></i> Bình luận ({post.comments})
        </span>

        <span>
          <i className="fas fa-share"></i> Chia sẻ ({post.shares})
        </span>
      </div>

      {showComments && hasComments && (
        <div className="post-comments-section">
          {post.commentList.map((comment) => (
            <Comment key={comment.id} comment={comment} currentUserAvatar={currentUserAvatar} />
          ))}
        </div>
      )}

      <div className="post-comment-box">
        <img className="comment-avatar" src={currentUserAvatar || "/placeholder.svg"} alt="Bạn avatar" />
        <form onSubmit={handleCommentSubmit} className="comment-form">
          <input
            type="text"
            placeholder="Viết bình luận..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <button type="submit" className="comment-submit-btn">
            <i className="fas fa-paper-plane"></i>
          </button>
        </form>
      </div>
    </div>
  )
}

export default Post
