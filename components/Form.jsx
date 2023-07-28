import Link from "next/link";
import { useState, useRef } from "react";
import { FaTrash } from "react-icons/fa";

const Form = ({
  type,
  post,
  setPost,
  submitting,
  handleSubmit,
  imageUpload,
  image,
  setImage,
  tags,
}) => {
  const key = "#";

  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState(0);
  const inputRef = useRef(null);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setPost(value);
    setShowSuggestions(value.includes(key));
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setSelectedSuggestion((prevIndex) => (prevIndex + 1) % items.length);
    } else if (e.key === "ArrowUp") {
      setSelectedSuggestion(
        (prevIndex) => (prevIndex - 1 + items.length) % items.length
      );
    } else if (e.key === "Enter") {
      if (items.length > 0) {
        const selectedValue = items[selectedSuggestion].hashtag;
        console.log("enter", selectedValue);
        setPost((prevValue) =>
          prevValue.replace(/#[a-zA-Z0-9]+$/, selectedValue + " ")
        );
        setSelectedSuggestion(0);
        setShowSuggestions(false);
        inputRef.current.focus();
        e.preventDefault();
      }
    }
  };

  const handleSuggestionClick = (value) => {
    const updatedValue = post.replace(
      new RegExp(`\\${post}\\b`),
      `${key}${value} `
    );
    setPost(updatedValue);
    setShowSuggestions(false);
    inputRef.current.focus();
  };

  const filterTagsByInput = (tags, post) => {
    const filterText = post.slice(post?.lastIndexOf(key) + 1).toLowerCase();
    // Filter tags based on the input value
    return tags.filter((tag) =>
      tag?.hashtag?.toLowerCase().includes(filterText)
    );
  };

  const items = filterTagsByInput(tags, post);

  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Post</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share amazing prompts with the world, and let your
        imagination run wild with any AI-powered platform
      </p>

      {/* <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your AI Prompt
          </span>

          <textarea
            value={post.prompt}
            onChange={(e) => setPost(e.target.value)}
            placeholder="Write your post here"
            required
            className="form_textarea "
          />
        </label>

        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Field of Prompt{" "}
            <span className="font-normal">
              (#product, #webdevelopment, #idea, etc.)
            </span>
          </span>
          <input
            value={post.tag}
            onChange={(e) => setTag(e.target.value)}
            type="text"
            placeholder="#Tag"
            required
            className="form_input"
          />
        </label>

        <input type="file" className="form-control" onChange={imageUpload} />

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>

          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
          >
            {submitting ? `${type.slice(0, -1)}ing...` : type}
          </button>
        </div>
      </form> */}

      <div className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism">
        <div className="w-full max-w-lg relative">
          <label>
            <span className="font-satoshi font-semibold text-base text-gray-700">
              Tweet
            </span>

            <textarea
              className="form_textarea"
              rows="6"
              placeholder="Type # to trigger the mention"
              style={{ width: "123%" }}
              value={post}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              ref={inputRef}
              required
            />
          </label>

          {showSuggestions && (
            <div
              className="absolute z-30"
              style={{
                display: showSuggestions ? "block" : "none",
                top: "100%",
                left: "0",
              }}
            >
              <div className="bg-white overflow-auto rounded-lg shadow-md z-10 py-2 border border-gray-300 text-gray-800 text-base absolute">
                <ul className="list-reset">
                  {items?.map((item, index) => (
                    <li
                      key={item.hashtag}
                      onClick={() => handleSuggestionClick(item.hashtag)}
                      className={`px-4 py-1 flex no-underline hover:no-underline transition-colors duration-100 text-nowrap whitespace-nowrap ${
                        selectedSuggestion === index
                          ? "bg-indigo-500 text-white"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      <span className="font-bold">{item.hashtag}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
        {image ? (
          <>
            <FaTrash
              className="new_tweet"
              onClick={() => {
                setImage("");
              }}
            />
            <img
              src={image || post?.image}
              alt="test"
              className="rounded-lg border-2 border-cyan-400 h-full"
            />
          </>
        ) : (
          <input type="file" className="form-control" onChange={imageUpload} />
        )}
        <div className="flex-end mx-3 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
          >
            {submitting ? `${type.slice(0, -1)}ing...` : type}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Form;
