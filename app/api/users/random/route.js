import User from "@/models/user";
import { connectToDB } from "@/utils/database";

export const GET = async () => {
    try {
        await connectToDB();
        const users = await User.aggregate([{ $sample: { size: 4 } }]);
        return new Response(JSON.stringify(users), { status: 200 });
    } catch (error) {
        console.error('Failed to fetch random users:', error);
        return new Response("Failed to fetch random users", { status: 500 });
    }
};
