import Prompt from "@/models/prompt";
import { connectToDB } from "@/utils/database";

export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        const tweets = await Prompt.find({ creator: params.id }).populate('creator').populate('original_creator')
        // const retweets = await Prompt.find({ retweeter: params.id }).populate('creator').populate('retweeter')
        // const combine = retweets.concat(tweets)
        return new Response(JSON.stringify(tweets), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all tweets", { status: 500 })
    }
} 