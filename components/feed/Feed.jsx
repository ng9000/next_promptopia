"use client";
import React, { useEffect, useState } from "react";
import Tweet from "./tweet";
import { useSession } from "next-auth/react";
import Loading from "./loading";

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);
  const { data: session } = useSession();

  const fetchPosts = async (id) => {
    const response = await fetch(`api/users/${id}/post`, {
      cache: "no-cache",
    });
    const data = await response.json();

    setAllPosts((prevAllPosts) => {
      const uniquePosts = new Set(prevAllPosts.map((post) => post._id));
      const filteredData = data.filter((post) => !uniquePosts.has(post._id));
      const combinedArray = [...prevAllPosts, ...filteredData];
      return combinedArray.reverse();
    });
  };

  const fetchFriendsPost = () => {
    setAllPosts([]);
    if (session?.user?.id)
      session?.user.following.map((userId) => fetchPosts(userId));

    fetchPosts(session?.user.id);
  };

  useEffect(() => {
    if (allPosts.length === 0 && session?.user?.id) {
      fetchFriendsPost();
    }

    fetchPosts(session?.user.id);
  }, [session?.user.id]);

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
    }, 500);

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
      {session?.user.id ? (
        <>
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

            {allPosts.length === 0 ? (
              <Loading />
            ) : (
              <Tweet
                tweet={searchText ? searchedResults : allPosts}
                setAllPosts={setAllPosts}
                fetchPosts={fetchPosts}
                setSearchedResults={setSearchText}
              />
            )}
          </div>
        </>
      ) : (
        <div className="text-3xl">Login to view posts</div>
      )}
    </div>
  );
};

export default Feed;
