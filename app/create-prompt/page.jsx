"use client";
import React, { useEffect, useRef, useState } from "react";
import Form from "@/components/Form";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Loading from "../loading";

const CreatePrompt = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const [image, setImage] = useState("");
  const [post, setPost] = useState("");
  const [tags, setTags] = useState([]);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!session?.user?.id) {
      timeoutRef.current = setTimeout(() => {
        router.push("/");
      }, 2000);
    } else {
      clearTimeout(timeoutRef.current);
      getTags();
    }

    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [session?.user.id]);

  const getTags = async () => {
    const tags = await fetch("/api/hashtags", {
      cache: "no-cache",
    });
    const response = await tags.json();
    setTags(response);
  };

  const findElements = (array1, array2) => {
    const commonElements = [];
    const nonCommonElements = [];

    array1.forEach((element) => {
      const matchingObject = array2.find((obj) => obj.hashtag === element);
      if (matchingObject) {
        commonElements.push(matchingObject);
      } else {
        nonCommonElements.push(element);
      }
    });

    return { commonElements, nonCommonElements };
  };

  // upload new tag to hashtag collection
  const uploadTag = async (tag) => {
    await fetch("/api/hashtags/new", {
      method: "POST",
      body: JSON.stringify({
        hashtag: tag,
        number_of_times_used: 1,
      }),
    });
  };

  // update tag increase count and add post id in array
  const updateTag = async (tag, id) => {
    await fetch(`/api/hashtags/${tag._id}`, {
      method: "PATCH",
      body: JSON.stringify({
        id: id,
      }),
    });
  };

  const createPrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const trimmedValue = post.replace(/^\s*[\r\n]/gm, "");
    const hashtags = post.match(/#[a-zA-Z0-9_]+/g);
    const uniqueHashtags = [...new Set(hashtags)];

    const { commonElements, nonCommonElements } = findElements(
      uniqueHashtags,
      tags
    );

    nonCommonElements.map((tag) => {
      uploadTag(tag);
    });

    if (session?.user.id) {
      try {
        const response = await fetch("api/prompt/new", {
          method: "POST",
          body: JSON.stringify({
            prompt: trimmedValue,
            userId: session?.user.id,
            tag: uniqueHashtags.join(),
            likes: 0,
            image: image,
            number_of_retweets: 0,
            createdAt: new Date(),
          }),
        });
        if (response.ok) {
          const x = await response.json();

          commonElements.map((tag) => {
            updateTag(tag, x._id);
          });
          router.push("/");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setSubmitting(false);
      }
    }
  };

  if (!session?.user.id) {
    return (
      <h1 className="align-middle text-center">
        <Loading />
      </h1>
    );
  }
  return (
    <div>
      <Form
        type="Create"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={createPrompt}
        image={image}
        setImage={setImage}
        tags={tags}
      />
    </div>
  );
};

export default CreatePrompt;
