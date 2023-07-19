import React, { useState, useRef } from "react";

const TweetForm = () => {
  const key = "#";
  const tags = [
    {
      value: "#alpine",
      times_used: 0,
    },
    {
      value: "#alpinestars",
    },
    // Add other tag objects
  ];
  const [post, setPost] = useState("");
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
        const selectedValue = items[selectedSuggestion].value;
        setPost((prevValue) => prevValue.slice(0, -1) + selectedValue + " ");
        setSelectedSuggestion(0);
        setShowSuggestions(false);
        inputRef.current.focus();
        e.preventDefault();
      }
    }
  };

  const handleSuggestionClick = (value) => {
    setPost((prevValue) =>
      prevValue.replace(`${key}${post}`, `${key}${value} `)
    );
    setShowSuggestions(false);
    inputRef.current.focus();
  };

  const filterTagsByInput = (tags, post) => {
    const filterText = post.slice(post.lastIndexOf(key) + 1).toLowerCase();
    // Filter tags based on the input value
    return tags.filter((tag) => tag.value.toLowerCase().includes(filterText));
  };

  const items = filterTagsByInput(tags, post);

  const handleSubmit = () => {
    // Remove unnecessary empty lines
    const trimmedValue = post.replace(/^\s*[\r\n]/gm, "");

    // Log the trimmed input value
    console.log(trimmedValue);

    // Extract unique numbers using regex
    const hashtags = post.match(/#[a-zA-Z0-9_]+/g);
    const uniqueHashtags = [...new Set(hashtags)];
    console.log("Unique Hashtags:", uniqueHashtags);
  };

  return (
    <div className="bg-gray-50 flex items-center justify-center px-3 py-5">
      <div className="w-full max-w-lg relative">
        <textarea
          className="w-full bg-white border-2 border-gray-300 shadow-lg px-3 py-2 rounded-lg focus:outline-none focus:border-indigo-500"
          rows="6"
          placeholder="Type # to trigger the mention"
          value={post}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          ref={inputRef}
          required
        ></textarea>
        {showSuggestions && (
          <div
            className="absolute z-30"
            style={{
              display: showSuggestions ? "block" : "none",
              top: "100%",
              left: "0",
            }}
          >
            <div className="bg-white overflow-auto rounded-lg shadow-md z-10 py-2 border border-gray-300 text-gray-800 text-xs absolute">
              <ul className="list-reset">
                {items.map((item, index) => (
                  <li
                    key={item.value}
                    onClick={() => handleSuggestionClick(item.value)}
                    className={`px-4 py-1 flex no-underline hover:no-underline transition-colors duration-100 text-nowrap whitespace-nowrap ${
                      selectedSuggestion === index
                        ? "bg-indigo-500 text-white"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <span className="font-bold">{`[${item.value}]`}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default TweetForm;
