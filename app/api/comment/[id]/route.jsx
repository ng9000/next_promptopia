import Comment from "@/models/comment";
import Prompt from "@/models/prompt";
import { connectToDB } from "@/utils/database";

export const PATCH = async (request, { params }) => {
  const { comment } = await request.json();

  try {
    await connectToDB();
    const existingPrompt = await Prompt.findById(params.id);
    if (!existingPrompt)
      return new Response("Tweet doesn't exist", { status: 404 });

    const newPrompt = Comment({ creator: comment });
    existingPrompt.comments.push(newPrompt.creator);

    await existingPrompt.save();
    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    console.error("Error updating tweet:", error);
    return new Response("Failed to update tweet: " + error.message, {
      status: 500,
    });
  }
};
