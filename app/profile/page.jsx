"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Profile from "@/components/Profile";
import { useSession } from "next-auth/react";

const MyProfile = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");
  const [posts, setPosts] = useState([]);
  const { data: session } = useSession();

  const fetchPosts = async () => {
    const response = await fetch(`/api/users/${userId}/post`, {
      cache: "no-cache",
    });
    const data = await response.json();
    setPosts(data);
  };

  useEffect(() => {
    // if (session?.user.id) {
    //   router.push(`profile/${session?.user.id}`);
    // } else {
    fetchPosts();
    // }
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

export default MyProfile;
