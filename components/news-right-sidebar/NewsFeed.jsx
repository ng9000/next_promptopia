"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const NewsFeed = () => {
  const [explore, setExplore] = useState([]);
  const [followUsers, setFollowUsers] = useState([]);
  const { data: session } = useSession();
  useEffect(() => {
    getExploreData();
  }, []);

  const getExploreData = async () => {
    try {
      const response = await fetch("/api/hashtags");
      const tags = await response.json();
      const sortedTags = tags.sort((a, b) => b.times_used - a.times_used);
      const exploreData = sortedTags.slice(0, 3);
      setExplore(exploreData);

      const users = await fetch("api/users/random");
      const follow = await users.json();
      //  const followSlice = follow.slice(0, 3);
      setFollowUsers(follow);
    } catch (error) {
      console.error("Failed to fetch explore data:", error);
    }
  };

  const handleFollow = async (userId) => {
    await fetch("api/users/follow", {
      method: "PATCH",
      body: JSON.stringify({
        sessionUser: session?.user.id,
        newFollow: userId,
      }),
    });
  };

  return (
    <div className="layout__right-sidebar-container ml-5">
      <div className="layout__right-sidebar">
        <div className="trends-for-you">
          {explore.length === 0 ? (
            ""
          ) : (
            <>
              <div className="trends-for-you__block">
                <div className="trends-for-you__heading">Trends</div>
              </div>
              {explore.map((tag) => (
                <div className="trends-for-you__block" key={tag._id}>
                  {/* <div className="trends-for-you__meta-information">
              Trending in Germany
            </div> */}
                  <div className="trends-for-you__trend-name">
                    {tag.hashtag}
                  </div>
                  <div className="trends-for-you__meta-information">
                    {tag.times_used} Tweets
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
        <div className="who-to-follow">
          <div className="who-to-follow__block">
            <div className="who-to-follow__heading">Who to follow</div>
          </div>
          {followUsers?.map((user) => (
            <div key={user._id}>
              {user._id === session?.user.id ? (
                ""
              ) : (
                <div className={"who-to-follow__block"}>
                  <img
                    className="who-to-follow__author-logo"
                    src={user?.image}
                  />
                  <div className="who-to-follow__content">
                    <div>
                      <div className="who-to-follow__author-name">
                        {user?.username}
                      </div>
                      {/* <div className="who-to-follow__author-slug">@beckiandchris</div> */}
                    </div>
                    {user.followers.includes(session?.user.id) ? (
                      <div
                        className="following-button"
                        // onClick={() => handleFollow(user._id)}
                      >
                        Following
                      </div>
                    ) : (
                      <div
                        className="who-to-follow__button"
                        onClick={() => handleFollow(user._id)}
                      >
                        Follow
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsFeed;
