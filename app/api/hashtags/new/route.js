import { connectToDB } from "@/utils/database"
import Hashtag from "@/models/hashtag"

export const POST = async (req) => {
    const { hashtag, number_of_times_used } = await req.json()
    try {
        await connectToDB()
        const newHashtag = Hashtag({
            hashtag: hashtag,
            times_used: number_of_times_used,
        })
        await newHashtag.save()
        return new Response(JSON.stringify(newHashtag), { status: 201 })
    } catch (error) {
        console.log(error);
        return new Response("server Error", { status: 500 })
    }
}