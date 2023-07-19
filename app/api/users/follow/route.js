import User from "@/models/user";
import { connectToDB } from "@/utils/database";

export const PATCH = async (request) => {
    const { newFollow, sessionUser } = await request.json()

    try {
        await connectToDB();
        const existingUser = await User.findById(sessionUser)
        if (!existingUser)
            return new Response("user doesnt exist", { status: 404 })

        existingUser.following.push(newFollow)

        const follower = await User.findById(newFollow)
        if (!follower)
            return new Response("user doesnt exist", { status: 404 })

        follower.followers.push(sessionUser)

        await existingUser.save()
        await follower.save()
        return new Response(JSON.stringify(existingUser, follower), { status: 200 })
    } catch (error) {
        return new Response("Failed to update prompt", { status: 500 })
    }
}
