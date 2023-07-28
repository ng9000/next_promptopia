import { connectToDB } from "@/utils/database"
import Prompt from "@/models/prompt"

export const POST = async (req) => {
    const { userId, prompt, tag, likes, image, createdAt, number_of_retweets } = await req.json()
    try {
        await connectToDB()
        const newPrompt = Prompt({
            creator: userId,
            prompt,
            tag,
            likes,
            image,
            createdAt,
            number_of_retweets
        })
        await newPrompt.save()
        return new Response(JSON.stringify(newPrompt), { status: 201 })
    } catch (error) {
        console.log(error);
        return new Response("server Error", { status: 500 })
    }
}