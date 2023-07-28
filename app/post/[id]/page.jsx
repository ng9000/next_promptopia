"use client";
import TweetForm from "@/components/TweetForm/TweetForm";
import Comment from "@/components/feed/comment";
import Like from "@/components/feed/like";
import ProfileImage from "@/components/feed/profileImage";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const PostView = ({ params }) => {
  const [post, setPost] = useState({});
  const [allComments, setAllComments] = useState([]);
  const [hide, setHide] = useState("");

  useEffect(() => {
    getPost();
  }, []);

  useEffect(() => {
    if (allComments.length === 0) loadComments();
  }, [post]);

  const getPost = async () => {
    const postResponse = await fetch(`/api/prompt/${params.id}`, {
      cache: "no-store",
    });
    const postData = await postResponse.json();
    setPost(postData);
  };

  const loadComments = async () => {
    setAllComments([]);
    post?.comments?.map(async (commentId) => {
      const commentResponse = await fetch(`/api/comment/search/${commentId}`, {
        cache: "no-store",
      });
      const commentData = await commentResponse.json();
      setAllComments((prevComments) => [...prevComments, commentData]);
    });
  };

  return (
    <div className="tweet tweet-page">
      <ProfileImage profileImage={post?.creator?.image} />
      <div className="tweet__main">
        <div className="tweet__header">
          <div className="tweet__author-name">{post?.creator?.username}</div>
          {/* <div className="tweet__author-slug"></div> */}
          <div className="tweet__publish-time">
            {moment(post.createdAt).fromNow()}
          </div>
        </div>
        <div className="tweet__content">
          {post.is_retweet ? post?.retweet_data?.quote : post?.prompt}
        </div>

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
        <Like post={post} setAllPosts={setPost} />
        {/* Comment */}
        <div>
          <TweetForm setAllComments={setAllComments} tweetId={params?.id} />
          {allComments?.map((post, index) => (
            <div key={post._id}>
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
                  <Link href={`/post/${post?._id}`}>
                    <Comment
                      postIndex={index}
                      hide={hide}
                      comments={post?.comments}
                      tweetId={post?._id}
                      setHide={setHide}
                      setAllPosts={setAllComments}
                      allPosts={allComments}
                    />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostView;
