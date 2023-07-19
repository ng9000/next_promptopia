import { connectToDB } from "@/utils/database"
import Prompt from "@/models/prompt"

export const POST = async (req) => {
    const { userId, prompt, tag, likes, image, createdAt } = await req.json()
    try {
        await connectToDB()
        const newPrompt = Prompt({
            creator: userId,
            prompt,
            tag,
            likes,
            image,
            createdAt
        })
        const savedPrompt = await newPrompt.save()
        const promptId = savedPrompt._id
        return new Response(JSON.stringify(promptId), { status: 201 })
    } catch (error) {
        console.log(error);
        return new Response("server Error", { status: 500 })
    }
}