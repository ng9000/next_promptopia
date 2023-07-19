import React, { useState } from "react";
import ProfileImage from "./profileImage";
import Image from "next/image";
import moment from "moment/moment";
import Like from "./like";
import Comment from "./comment";
import Link from "next/link";
import { FaRetweet } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Tweet = ({ tweet, setAllPosts, fetchPosts, setSearchedResults }) => {
  const [hide, setHide] = useState("");
  const [quote, setQuote] = useState("retweet");
  const [image, setImage] = useState("");
  const [quoteImage, setQuoteImage] = useState("");
  const { data: session } = useSession();
  const router = useRouter();
  const handleProfileClick = (creator) => {
    if (creator._id === session?.user.id)
      return router.push(`/profile?id=${session?.user.id}`);
    router.push(`/profile/${creator._id}?name=${creator.username}`);
  };

  const handleRetweet = async (tweetData) => {
    console.log(tweetData);
    const retweet = await fetch("/api/retweet", {
      method: "POST",
      body: JSON.stringify({
        creator: tweetData.creator._id,
        retweeter: session?.user.id,
        prompt: tweetData.is_retweet
          ? tweetData?.retweet_data.quote
          : tweetData?.prompt,
        quote: quote,
        original_tag: tweetData?.tag,
        likes: 0,
        original_id: tweetData._id,
        image: tweetData?.image,
        quoted_image: quoteImage,
        retweetedAt: new Date(),
        createdAt: tweetData?.createdAt,
      }),
    });
    const retweetResponse = await retweet.json();
    fetchPosts();
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
                  profileImage={post?.retweeter.image}
                  onClick={() => handleProfileClick(post?.retweeter)}
                />
                <div className="tweet__main">
                  <div className="tweet__header">
                    <div className="tweet__author-name">
                      {post?.retweeter.username}
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
              <div className="flex ml-14 border-2 p-2 rounded-lg">
                <ProfileImage
                  profileImage={post?.creator.image}
                  is_retweet={true}
                  onClick={() => handleProfileClick(post?.creator)}
                />
                <div className="retweet__main">
                  <div className="tweet__header">
                    <div className="tweet__author-name">
                      {post?.creator.username}
                    </div>
                    <div className="tweet__publish-time">
                      {moment(post.createdAt).fromNow()}
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
                        className="w-full mb-2 mt-5 rounded-s-2xl"
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
                </div>
              </div>
              <div className="ml-14 mt-1">
                {/* Like */}
                <Like setAllPosts={setAllPosts} allPosts={tweet} post={post} />
                {/* Comment */}
                <FaRetweet
                  className="inline-flex mx-4 align-baseline text-lg"
                  onClick={() => {
                    setImage(post?.image);
                    handleRetweet(post);
                  }}
                />
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
                {/* Comment */}
                <FaRetweet
                  className="inline-flex mx-4 align-baseline text-lg"
                  onClick={() => {
                    setImage(post?.image);
                    handleRetweet(post);
                  }}
                />
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
        </div>
      ))}
    </>
  );
};

export default Tweet;
