"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "@/components/Profile";

const OtherProfiles = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/post`);
      const data = await response.json();
      // console.log(data);
      setPosts(data);
    };
    if (session?.user.id) fetchPosts();
  }, []);
  const handleUpdate = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };
  const handleDelete = async (post) => {
    const x = confirm("Are you sure you want to delete?");
    if (x) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });

        const filtered = posts.filter((p) => p._id !== post._id);
        setPosts(filtered);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div>
      <Profile
        name="My"
        desc="Description"
        data={posts}
        handleEdit={handleUpdate}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default OtherProfiles;
