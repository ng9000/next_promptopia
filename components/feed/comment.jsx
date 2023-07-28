import React, { useState } from "react";
import { FaRegCommentAlt } from "react-icons/fa";
import Image from "next/image";
import moment from "moment";
import Like from "./like";
import TweetForm from "../TweetForm/TweetForm";
import Link from "next/link";

const Comment = ({ postIndex, hide, tweetId, setHide, comments }) => {
  const [allComments, setAllComments] = useState([]);

  const loadComments = async (comments) => {
    setAllComments([]);
    comments?.map(async (commentId) => {
      const commentResponse = await fetch(`api/comment/search/${commentId}`);
      const commentData = await commentResponse.json();
      setAllComments((prevComments) => [...prevComments, commentData]);
    });
  };

  return (
    <>
      <span
        className="inline-flex ml-2 cursor-pointer"
        onClick={() => {
          setHide(hide === postIndex ? "" : postIndex);
          loadComments(comments);
        }}
      >
        <FaRegCommentAlt className="align-baseline mt-1" />
        <span
          className={`ml-2 align-baseline ${
            comments.length === 0 ? "hidden" : ""
          }`}
        >
          {comments.length}
          <b className="ml-1 opacity-50">
            {comments.length === 1 ? "Comment" : "Comments"}
          </b>
        </span>
      </span>
      <div
        className={hide !== postIndex ? "hidden" : ""}
        style={{ width: "400px", margin: "auto" }}
      >
        <TweetForm
          setAllComments={setAllComments}
          allComments={allComments}
          tweetId={tweetId}
          // loadComments={() => loadComments(comments)}
        />
        {allComments?.map((post, index) => (
          <div key={`${index}_comment`}>
            <div className="comment" key={post?._id}>
              <Image
                src={post?.creator?.image}
                className="comment__author-logo"
                height={30}
                width={30}
                alt="hdfj"
              />
              <div className="tweet__main">
                <div className="tweet__header">
                  <div className="tweet__author-name">
                    {post?.creator?.username}
                  </div>
                  {/* <div className="tweet__author-slug"></div> */}
                  <div className="tweet__publish-time text-xs mt-0.5 ml-40">
                    {moment(post.createdAt).fromNow()}
                  </div>
                </div>
                <Link href={`/post/${post._id}`}>
                  <div className="tweet__content">{post?.prompt}</div>
                </Link>

                {/* Tweet Image */}
                <>
                  {post?.image ? (
                    <Image
                      className="tweet__image"
                      src={post?.image}
                      width={0}
                      height={0}
                      sizes="100vw"
                      alt="Cant load Image"
                      style={{ width: "100%", height: "auto" }} // option
                    />
                  ) : (
                    ""
                  )}
                </>
                {/* Like */}
                <Like
                  post={post}
                  setAllPosts={setAllComments}
                  allPosts={allComments}
                />
                <Link href={`/post/${post?._id}`} className="inline-flex mx-2">
                  <FaRegCommentAlt className="align-baseline mt-1" />
                  <span
                    className={`ml-2 align-baseline ${
                      post?.comments?.length === 0 ? "hidden" : ""
                    }`}
                  >
                    {post?.comments?.length}
                    <b className="ml-1 opacity-50">
                      {post?.comments?.length === 1 ? "Comment" : "Comments"}
                    </b>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Comment;
