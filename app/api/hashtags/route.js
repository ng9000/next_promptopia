import Hashtag from "@/models/hashtag";
import { connectToDB } from "@/utils/database";

export const GET = async (request) => {
    try {
        await connectToDB()

        const hashtags = await Hashtag.find({})

        return new Response(JSON.stringify(hashtags), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all hashtags", { status: 500 })
    }
} 