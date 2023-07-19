import Hashtag from "@/models/hashtag";
import { connectToDB } from "@/utils/database";

export const PATCH = async (request, { params }) => {
    const { id } = await request.json()

    try {
        await connectToDB();
        const existingPrompt = await Hashtag.findById(params.id)
        if (!existingPrompt)
            return new Response("Tag doesnt exist", { status: 404 })

        existingPrompt.times_used = existingPrompt.times_used + 1
        existingPrompt.tweets.push(id);

        await existingPrompt.save()
        return new Response(JSON.stringify(existingPrompt), { status: 200 })
    } catch (error) {
        return new Response("Failed to update tag", { status: 500 })
    }
}