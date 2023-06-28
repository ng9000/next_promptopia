"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Profile from "@/components/Profile";

const OtherProfiles = ({ params }) => {
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const response = await fetch(`/api/users/${params?.id}/post`);
    const data = await response.json();
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <Profile name={`${userName}'s`} desc="" data={posts} />
    </div>
  );
};

export default OtherProfiles;
