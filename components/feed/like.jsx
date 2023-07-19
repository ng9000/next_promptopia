import { useSession } from "next-auth/react";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

const Like = ({ setAllPosts, allPosts, post }) => {
  const { data: session } = useSession();

  const handleUpdateLike = async (promptId) => {
    const response = await fetch(`/api/prompt/${promptId}`);
    const data = await response.json();

    if (allPosts) {
      const index = allPosts.findIndex((post) => post._id === promptId);
      if (index !== -1) {
        const updatedPosts = [...allPosts];
        updatedPosts[index] = data;
        setAllPosts(updatedPosts);
      }
    } else {
      setAllPosts(data);
    }
  };

  const handleLike = async (id, likes, likeIds) => {
    try {
      const response = await fetch(`/api/like/${id}`, {
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
      const response = await fetch(`/api/like/${id}`, {
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
      {post?.likeIds?.includes(session?.user.id) ? (
        <FaHeart
          className="inline-flex mr-1 mt-1 align-baseline z-50"
          style={{ color: "#f9a8d4" }}
          onClick={() => handleDislike(post._id, post.likes, post.likeIds)}
        />
      ) : (
        <FaRegHeart
          className="inline-flex mr-1 mt-1 align-baseline"
          onClick={() => handleLike(post._id, post.likes, post.likeIds)}
        />
      )}
      <span className={`text-l  ${post?.likes === 0 ? "hidden" : ""}`}>
        {post?.likes}
        <b className="opacity-50">{post?.likes === 1 ? "Like" : "Likes"}</b>
      </span>
    </>
  );
};

export default Like;
