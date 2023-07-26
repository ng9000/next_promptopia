import Prompt from "@/models/prompt";
import { connectToDB } from "@/utils/database";

export const POST = async (req) => {
    const {
        creator,
        original_creator,
        prompt,
        quote,
        tag,
        original_tag,
        retweets,
        likes,
        image,
        createdAt,
        original_id,
        retweetedAt,
        quoted_image,
    } = await req.json();
    try {
        await connectToDB();
        const newPrompt = Prompt({
            creator: creator,
            original_creator: original_creator,
            is_retweet: true,
            prompt,
            retweet_data: {
                quote: quote,
                quote_image: quoted_image,
                retweet_created_at: retweetedAt,
            },
            tag,
            original_tag,
            retweets,
            original_id,
            likes,
            image,
            createdAt,
        });
        const savedPrompt = await newPrompt.save();
        //const promptId = savedPrompt._id
        return new Response(JSON.stringify(savedPrompt), { status: 201 });
    } catch (error) {
        console.log(error);
        return new Response("server Error", { status: 500 });
    }
};
