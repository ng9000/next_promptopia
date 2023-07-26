import User from "@/models/user";
import { connectToDB } from "@/utils/database";

export const PATCH = async (request) => {
    const { newFollow, sessionUser } = await request.json()

    try {
        await connectToDB();
        const existingUser = await User.findById(sessionUser)
        if (!existingUser)
            return new Response("user doesnt exist", { status: 404 })

        const index = existingUser.following.findIndex((x) => newFollow === x)
        existingUser.following.splice(index, 1)

        const follower = await User.findById(newFollow)
        if (!follower)
            return new Response("user doesnt exist", { status: 404 })

        const index2 = follower.followers.findIndex((x) => sessionUser === x)
        follower.followers.splice(index2, 1)

        await existingUser.save()
        await follower.save()
        return new Response(JSON.stringify(existingUser, follower), { status: 200 })
    } catch (error) {
        return new Response("Failed to update prompt", { status: 500 })
    }
}
