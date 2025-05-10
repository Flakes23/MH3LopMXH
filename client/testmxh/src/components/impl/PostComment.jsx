"use client"

import { useState } from "react"
import "./PostComment.css"

// Comment component to display individual comments
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

// Updated Post component with comments display
const Post = ({ post, currentUserAvatar, onAddComment }) => {
  const [commentText, setCommentText] = useState("")
  const [showComments, setShowComments] = useState(false)

  const handleCommentSubmit = (e) => {
    e.preventDefault()
    if (commentText.trim()) {
      onAddComment(post.id, commentText)
      setCommentText("")
    }
  }

  // Check if post has comments
  const hasComments = post.commentList && post.commentList.length > 0

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
        {post.likes > 0 && (
          <>
            <i className="far fa-thumbs-up"></i> {post.likes} người đã bày tỏ cảm xúc
          </>
        )}
      </div>

      <div className="post-actions">
        <span>
          <i className="far fa-thumbs-up"></i> Thích
        </span>
        <span onClick={() => setShowComments(!showComments)} style={{ cursor: "pointer" }}>
          <i className="far fa-comment"></i> Bình luận ({post.comments})
        </span>
        <span>
          <i className="fas fa-share"></i> Chia sẻ ({post.shares})
        </span>
      </div>

      {/* Comments section */}
      {showComments && hasComments && (
        <div className="post-comments-section">
          {post.commentList.map((comment) => (
            <Comment key={comment.id} comment={comment} currentUserAvatar={currentUserAvatar} />
          ))}
        </div>
      )}
      {/* Comment form */}
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
