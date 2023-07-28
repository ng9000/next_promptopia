"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Tweet from "./tweet";

const Explore = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);
  const { data: session } = useSession();
  // console.log("all posts gkjjkjkjkhjkkjhk", allPosts);

  const fetchPosts = async () => {
    const response = await fetch("/api/prompt", {
      cache: "no-store",
    });
    const data = await response.json();
    setAllPosts(data.reverse());
  };

  useEffect(() => {
    fetchPosts();
  }, [session?.user.id]);

  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i");
    return allPosts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt) ||
        regex.test(item?.retweet_data?.quote)
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
      <span className="blue_gradient text-3xl">Explore</span>

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

export default Explore;
