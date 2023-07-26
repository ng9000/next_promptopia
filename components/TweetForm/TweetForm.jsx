import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { FaImage, FaTrash } from "react-icons/fa";

const TweetForm = ({ setAllComments, tweetId }) => {
  const [newComment, setNewComment] = useState("");
  const [image, setImage] = useState("");
  const { data: session } = useSession();

  const imageUpload = (e) => {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setImage(reader.result);
    };
  };

  const handleComment = async (e) => {
    e.preventDefault();

    if (session?.user.id) {
      try {
        const response = await fetch("/api/comment/new", {
          method: "POST",
          body: JSON.stringify({
            prompt: newComment,
            userId: session?.user.id,
            likes: 0,
            image: image,
            createdAt: new Date(),
          }),
        });
        const responseData = await response.json();
        if (response.ok) {
          // handleUpdateComment(tweetId);
          patchComment(responseData);
          setNewComment("");
          setImage("");
        }
      } catch (error) {
        console.log(error);
      } finally {
      }
    }
  };
  const patchComment = async (postId) => {
    try {
      const response = await fetch(`/api/comment/${tweetId}`, {
        method: "PATCH",
        body: JSON.stringify({
          comment: postId,
        }),
      });
      if (response.ok) {
        const commentResponse = await fetch(`/api/comment/search/${postId}`);
        const commentData = await commentResponse.json();
        setAllComments((prevComments) => [...prevComments, commentData]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {image ? (
        <>
          <img src={image} alt="test" className="image_upload mb-5" />
          <FaTrash
            className="delete_upload_user"
            onClick={() => {
              setImage("");
            }}
          />
        </>
      ) : null}
      <form onSubmit={handleComment} className="my-2">
        <label htmlFor="imageSend">
          <span className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded inline-flex chat_search_user me-1">
            <FaImage />
          </span>
        </label>
        <input
          type="file"
          accept="image/*"
          id="imageSend"
          className="hidden"
          onChange={(e) => {
            imageUpload(e);
            setImage(e.target.files[0]);
          }}
        />
        <input
          type="text"
          id="search"
          autoComplete="off"
          onChange={(e) => setNewComment(e.target.value)}
          value={newComment}
          placeholder="Comment"
          //style={{ width: "100%" }}
          //className="inline-flex w-96 mr-3 p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-blue-500 light:focus:border-blue-500"
          className="peer h-full w-72 mx-2 inline-flex border-b-2 border-gray-500 bg-transparent pt-2 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-700 focus:border-blue-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
        />
        <button
          type="submit"
          disabled={newComment ? "" : true}
          className={`${
            newComment ? "bg-blue-500 hover:bg-blue-700" : "bg-blue-300"
          } text-white font-bold py-1 px-2 rounded`}
        >
          Send
        </button>
      </form>
    </>
  );
};

export default TweetForm;
