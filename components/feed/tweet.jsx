import React from "react";
import ProfileImage from "./profileImage";
import Image from "next/image";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { useSession } from "next-auth/react";

const Tweet = ({ tweet, setAllPosts, allPosts }) => {
  const { data: session } = useSession();

  const handleUpdateLike = async (promptId) => {
    const response = await fetch(`/api/prompt/${promptId}`);
    const data = await response.json();
    const index = allPosts.findIndex((post) => post._id === promptId);
    if (index !== -1) {
      const updatedPosts = [...allPosts];
      updatedPosts[index] = data;
      setAllPosts(updatedPosts);
    }
  };

  const handleLike = async (id, likes, likeIds) => {
    try {
      const response = await fetch(`api/like/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
          tweet_id: id,
          likes: likes + 1,
          likeIds: [...likeIds, session?.user.id],
        }),
      });
      if (response.ok) {
        handleUpdateLike(id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDislike = async (id, likes, likeIds) => {
    try {
      const response = await fetch(`api/like/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
          tweet_id: id,
          likes: likes - 1,
          likeIds: likeIds.filter((id) => id !== session?.user.id),
        }),
      });
      if (response.ok) {
        handleUpdateLike(id);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {tweet.map((post) => (
        <div className="tweet" key={post._id}>
          <ProfileImage profileImage={post.creator.image} />
          <div className="tweet__main">
            <div className="tweet__header">
              <div className="tweet__author-name">{post.creator.username}</div>
              {/* <div className="tweet__author-slug">{post.creator.email}</div> */}
              <div className="tweet__publish-time">38m</div>
            </div>
            <div className="tweet__content">
              {post.prompt} <br /> {post.tag}
            </div>
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
            <span>
              {post?.likeIds?.includes(session?.user.id) ? (
                <FaHeart
                  className="inline-flex mr-1"
                  style={{ color: "#f9a8d4" }}
                  onClick={() =>
                    handleDislike(post._id, post.likes, post.likeIds)
                  }
                />
              ) : (
                <FaRegHeart
                  className="inline-flex mr-1"
                  onClick={() => handleLike(post._id, post.likes, post.likeIds)}
                />
              )}
              <span className="text-sm">{post?.likes}</span>
            </span>
          </div>
        </div>
      ))}
    </>
  );
};

export default Tweet;
