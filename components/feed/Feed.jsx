"use client";
import React, { useEffect, useState } from "react";
import Tweet from "./tweet";

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);

  const fetchPosts = async () => {
    const response = await fetch("/api/prompt");
    const data = await response.json();
    setAllPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <div>
      <span className="blue_gradient text-3xl">Home</span>
      <div className="layout__main">
        <Tweet tweet={allPosts} setAllPosts={setAllPosts} allPosts={allPosts} />
        {/* Tweet with image */}
        {/* <div className="tweet">
          <ProfileImage />
          <div className="tweet__main">
            <div className="tweet__header">
              <div className="tweet__author-name">Chris Martin</div>
              <div className="tweet__author-slug">@chris_martin</div>
              <div className="tweet__publish-time">15h</div>
            </div>
            <div className="tweet__content">
              One of my favorite things about the "ergonomics" of haskell is
              being able to leave underscores in code that isn't finished yet,
              and the type checker still works and provides useful information
              about the incomplete code. ("holes" --
              <a href="https://typeclasses.com/typed-holes">
                https://typeclasses.com/typed-holes
              </a>
              )
              <Image
                className="tweet__image"
                src="/assets/images/profile-image-1.jpg"
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "100%", height: "auto" }} // option
              />
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Feed;
