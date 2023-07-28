import React, { useEffect, useState } from "react";

import Image from "next/image";
import moment from "moment/moment";
import Like from "./like";
import Comment from "./comment";
import Link from "next/link";
import { FaRetweet } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import RetweetForm from "./RetweetForm";
import ProfileImage from "./profileImage";

const Tweet = ({ tweet, setAllPosts, fetchPosts }) => {
  const [tags, setTags] = useState([]);
  const [hide, setHide] = useState("");
  const [showRetweetForm, setShowRetweetForm] = useState("");
  const [quote, setQuote] = useState("");
  const [quoteImage, setQuoteImage] = useState("");
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    getTags();
  }, []);

  const handleProfileClick = (creator) => {
    if (creator._id === session?.user.id)
      return router.push(`/profile?id=${session?.user.id}`);
    router.push(`/profile/${creator._id}?name=${creator.username}`);
  };

  const getTags = async () => {
    const tags = await fetch("/api/hashtags", {
      cache: "no-cache",
    });
    const response = await tags.json();
    setTags(response);
  };

  const handleRetweet = async (tweetData) => {
    const trimmedValue = quote.replace(/^\s*[\r\n]/gm, "");

    const updateTweet = await fetch("/api/retweet", {
      method: "PATCH",
      body: JSON.stringify({
        id: tweetData._id,
        number_of_retweets: tweetData.number_of_retweets + 1,
      }),
    });
    const x = tweet.findIndex((data) => data._id === tweetData._id);
    const updatedPosts = [...tweet];
    updatedPosts[x] = {
      ...updatedPosts[x],
      number_of_retweets: tweetData.number_of_retweets + 1,
    };

    setAllPosts(updatedPosts);

    const retweet = await fetch("/api/retweet", {
      method: "POST",
      body: JSON.stringify({
        original_creator: tweetData.creator._id,
        creator: session?.user.id,
        prompt: tweetData.is_retweet
          ? tweetData?.retweet_data.quote
          : tweetData?.prompt,
        quote: trimmedValue,
        original_tag: tweetData?.tag,
        likes: 0,
        number_of_retweets: 0,
        original_id: tweetData._id,
        image: tweetData?.image,
        quoted_image: quoteImage,
        retweetedAt: new Date(),
        createdAt: tweetData?.createdAt,
      }),
    });
    //const retweetResponse = await retweet.json();
    setShowRetweetForm("");
    setQuote("");
    //console.log(retweetResponse);
    // setAllPosts((prevAllPosts) => [...prevAllPosts, retweetResponse]);
    fetchPosts(session?.user.id);
  };

  // const handleTags = (tags) => {
  //   const splitTags = tags?.split(", ");
  //   return (
  //     <>
  //       {splitTags?.map((tag) => (
  //         <span
  //           key={`${tag}_id`}
  //           onClick={() => {
  //             setTimeout(() => {
  //               setSearchedResults(tag);
  //             }, 300);
  //           }}
  //           className="text-blue-800 cursor-pointer"
  //         >
  //           {tag}&nbsp;
  //         </span>
  //       ))}
  //     </>
  //   );
  // };

  return (
    <>
      {tweet.map((post, index) => (
        <div key={post?._id}>
          {post?.is_retweet ? (
            <div className="retweet">
              <div className="retweet_data">
                <ProfileImage
                  profileImage={post?.creator.image}
                  onClick={() => handleProfileClick(post?.creator)}
                />
                <div className="tweet__main">
                  <div className="tweet__header">
                    <div className="tweet__author-name">
                      {post?.creator.username}
                    </div>
                    <div className="tweet__publish-time">
                      {moment(post?.retweet_data?.retweet_created_at).fromNow()}
                    </div>
                  </div>
                  <Link
                    href={`/post/${post?._id}`}
                    className="show_tweet mb-2 break-words"
                    id="show_tweet"
                  >
                    {post?.retweet_data?.quote} <br />
                    {/* {handleTags(post?.tag)} */}
                  </Link>
                </div>
              </div>

              {/* Original tweet */}
              <div className="flex border-2 p-2 rounded-lg original-tweet_margin">
                <ProfileImage
                  profileImage={post?.original_creator.image}
                  is_retweet={true}
                  onClick={() => handleProfileClick(post?.original_creator)}
                />
                <div className="retweet__main">
                  <div className="tweet__header">
                    <div className="tweet__author-name">
                      {post?.original_creator.username}
                    </div>
                    <div className="tweet__publish-time">
                      {moment(post?.createdAt).fromNow()}
                    </div>
                  </div>
                  <Link
                    href={`/post/${post?.original_id}`}
                    className="no-underline mb-2"
                  >
                    <div className="retweet__content">
                      {post?.prompt} <br /> {post?.tag}
                    </div>
                  </Link>

                  {/* reTweet Image */}
                  <>
                    {post?.image ? (
                      <Image
                        className="w-full mb-2 mt-5 rounded"
                        src={post?.image}
                        width={0}
                        height={0}
                        sizes="100vw"
                        alt="Cant load Image"
                        style={{ width: "95%", height: "auto" }} // option
                      />
                    ) : (
                      ""
                    )}
                  </>
                </div>
              </div>
              <div className="ml-14 mt-1">
                {/* Like */}
                <Like setAllPosts={setAllPosts} allPosts={tweet} post={post} />
                {/* Comment */}
                <span className="inline-flex mx-3 ">
                  <FaRetweet
                    className="align-baseline text-lg mx-1"
                    onClick={() => {
                      setShowRetweetForm(index);
                    }}
                  />
                  <span
                    className={`text-l  ${
                      post?.number_of_retweets === 0 ? "hidden" : ""
                    }`}
                  >
                    {post?.number_of_retweets}
                    <b className="opacity-50">
                      {post?.number_of_retweets === 1 ? "Retweet" : "Retweets"}
                    </b>
                  </span>
                </span>
                <Comment
                  postIndex={index}
                  hide={hide}
                  comments={post?.comments}
                  tweetId={post?._id}
                  setHide={setHide}
                />
              </div>
            </div>
          ) : (
            <div
              className="tweet break-normal"
              key={post?._id}
              style={index === hide ? { borderLeft: "2px solid black" } : {}}
            >
              <ProfileImage
                profileImage={post?.creator.image}
                onClick={() => handleProfileClick(post?.creator)}
              />

              <div className="tweet__main">
                <div className="tweet__header">
                  <div className="tweet__author-name">
                    {post?.creator.username}
                  </div>
                  {post?.is_retweet ? "Retweet" : ""}
                  <div className="tweet__publish-time">
                    {moment(post.createdAt).fromNow()}
                  </div>
                </div>
                <div className="tweet__content break-words">
                  <Link
                    href={`/post/${post?._id}`}
                    className="show_tweet mb-2 break-normal "
                    id="show_tweet"
                  >
                    <p className="break-words">
                      {post?.prompt} <br />
                    </p>
                  </Link>
                  {/* {handleTags(post?.tag)} */}
                </div>

                {/* Tweet Image */}
                <>
                  {post?.image ? (
                    <Image
                      className="tweet__image mb-2"
                      src={post?.image}
                      width={0}
                      height={0}
                      sizes="100vw"
                      alt="Cant load Image"
                      style={{ width: "100%", height: "auto" }} // option
                    />
                  ) : (
                    ""
                  )}
                </>
                {/* Like */}
                <Like setAllPosts={setAllPosts} allPosts={tweet} post={post} />
                {/* Retweet */}
                <span className="inline-flex mx-3 ">
                  <FaRetweet
                    className="align-baseline text-lg mx-1"
                    onClick={() => {
                      setShowRetweetForm(index);
                    }}
                  />
                  <span
                    className={`text-l  ${
                      post?.number_of_retweets === 0 ? "hidden" : ""
                    }`}
                  >
                    {post?.number_of_retweets}
                    <b className="opacity-50">
                      {post?.number_of_retweets === 1 ? "Retweet" : "Retweets"}
                    </b>
                  </span>
                </span>
                {/* Comment */}
                <Comment
                  postIndex={index}
                  hide={hide}
                  comments={post?.comments}
                  tweetId={post?._id}
                  setHide={setHide}
                />
              </div>
            </div>
          )}
          <RetweetForm
            post={post}
            postIndex={index}
            setQuoteImage={setQuoteImage}
            showRetweetForm={showRetweetForm}
            setQuote={setQuote}
            quote={quote}
            handleRetweet={handleRetweet}
            setShowRetweetForm={setShowRetweetForm}
            tags={tags}
          />
        </div>
      ))}
    </>
  );
};

export default Tweet;
