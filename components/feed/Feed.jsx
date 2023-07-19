"use client";
import React, { useEffect, useState } from "react";
import Tweet from "./tweet";
import RetweetForm from "../retweetForm/RetweetForm";
import { useSession } from "next-auth/react";

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);
  const { data: session } = useSession();

  const fetchPosts = async (id) => {
    // const response = await fetch("/api/prompt");
    // const data = await response.json();
    // setAllPosts(data.reverse());
    const response = await fetch(`api/users/${id}/post`);
    const data = await response.json();
    setAllPosts(allPosts.concat(data));
  };

  useEffect(() => {
    if (allPosts.length === 0)
      session?.user?.following?.map((userId) => {
        fetchPosts(userId);
      });
  }, []);

  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i");
    return allPosts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  useEffect(() => {
    const searchTimeout = setTimeout(() => {
      const searchResult = filterPrompts(searchText);
      setSearchedResults(searchResult);
    }, 100);

    return () => {
      clearTimeout(searchTimeout);
    };
  }, [searchText]);

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 100)
    );
  };
  return (
    <div>
      <span className="blue_gradient text-3xl">Home</span>
      <div className="layout__main">
        <form className="relative w-full flex-center">
          <input
            type="search"
            placeholder="search for a tag or username"
            value={searchText}
            onChange={handleSearchChange}
            required
            className="search_input peer"
          />
        </form>
        {/* <RetweetForm /> */}
        <Tweet
          tweet={searchText ? searchedResults : allPosts}
          setAllPosts={setAllPosts}
          fetchPosts={fetchPosts}
          setSearchedResults={setSearchText}
        />
      </div>
    </div>
  );
};

export default Feed;
