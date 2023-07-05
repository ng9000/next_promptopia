import Prompt from "@/models/prompt";
import { connectToDB } from "@/utils/database";

export const PATCH = async (request) => {
    const { tweet_id, likes, likeIds } = await request.json()

    try {
        await connectToDB();
        const existingPrompt = await Prompt.findById(tweet_id)
        if (!existingPrompt)
            return new Response("Tweet doesnt exist", { status: 404 })

        existingPrompt.likes = likes;
        existingPrompt.likeIds = likeIds;

        await existingPrompt.save()
        return new Response(JSON.stringify(existingPrompt), { status: 200 })
    } catch (error) {
        return new Response("Failed to update tweet", { status: 500 })
    }
}