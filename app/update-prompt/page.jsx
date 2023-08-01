"use client";
import React, { useEffect, useState } from "react";
import Form from "@/components/Form";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import Loading from "../loading";

const EditPrompt = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState([]);
  const [image, setImage] = useState("");
  const [tags, setTags] = useState([]);

  useEffect(() => {
    if (promptId && session?.user.id) {
      getPrompt(promptId);
      getTags();
    } else {
      router.push("/");
    }
  }, [promptId, session?.user.id]);

  const getTags = async () => {
    const tags = await fetch("/api/hashtags", {
      cache: "no-cache",
    });
    const response = await tags.json();
    setTags(response);
  };

  const getPrompt = async (id) => {
    const response = await fetch(`/api/prompt/${id}`, {
      cache: "no-cache",
    });
    const data = await response.json();
    setPost(data.prompt);
    setImage(data.image);
  };

  const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    if (!promptId) alert("Prompt ID is Missing");
    try {
      const response = await fetch(`api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post,
          image: image,
          // tag: post.tag,
        }),
      });
      if (response.ok) {
        router.push(`/profile?id=${session?.user.id}`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  if (!post || post.length === 0) {
    return (
      <div>
        <Loading />
      </div>
    ); // You can show a loading indicator here
  }

  return (
    <div>
      <Form
        type="Edit"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={updatePrompt}
        tags={tags}
        image={image}
        setImage={setImage}
      />
    </div>
  );
};

export default EditPrompt;
