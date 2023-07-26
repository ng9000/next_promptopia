import React, { useState, useRef } from "react";

const RetweetForm = ({
  post,
  postIndex,
  setQuote,
  quote,
  setQuoteImage,
  showRetweetForm,
  handleRetweet,
  setShowRetweetForm,
  tags,
}) => {
  const key = "#";

  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState(0);
  const inputRef = useRef(null);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuote(value);
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
        setQuote((prevValue) =>
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
    const updatedValue = quote.replace(
      new RegExp(`\\${quote}\\b`),
      `${key}${value} `
    );
    setQuote(updatedValue);
    setShowSuggestions(false);
    inputRef.current.focus();
  };

  const filterTagsByInput = (tags, quote) => {
    const filterText = quote.slice(quote.lastIndexOf(key) + 1).toLowerCase();
    // Filter tags based on the input value
    return tags.filter((tag) =>
      tag?.hashtag?.toLowerCase().includes(filterText)
    );
  };

  const items = filterTagsByInput(tags, quote);
  const handleSubmit = () => {
    // Remove unnecessary empty lines
    const trimmedValue = quote.replace(/^\s*[\r\n]/gm, "");

    const hashtags = quote.match(/#[a-zA-Z0-9_]+/g);
    const uniqueHashtags = [...new Set(hashtags)];
    console.log("Unique Hashtags:", uniqueHashtags);
  };

  return (
    <>
      {showRetweetForm === postIndex ? (
        <div className="w-full max-w-lg ">
          <label>
            <textarea
              className="form_textarea ml-7"
              rows="3"
              placeholder="Write a quote for tweet"
              style={{ width: "90%", height: "100px" }}
              value={quote}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              ref={inputRef}
              // required
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
                  {items.map((item, index) => (
                    <li
                      key={item._id}
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
          <div style={{ marginTop: "10px", marginLeft: "290px" }}>
            <button
              onClick={() => setShowRetweetForm("")}
              className="px-5 py-1.5 text-sm rounded-full text-white bg-red-500 mx-1"
            >
              Cancle
            </button>
            <button
              onClick={() => handleRetweet(post)}
              disabled={quote ? "" : true}
              className={`px-5 py-1.5 text-sm rounded-full text-white mx-1 ${
                quote ? "bg-sky-500" : "bg-sky-300"
              }`}
            >
              Retweet
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default RetweetForm;
