import { Schema, model, models } from 'mongoose'

const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, 'Email already exists'],
        required: [true, "Email already in use"]
    },
    username: {
        type: String,
        required: [true, "Email already in use"],
    },
    image: {
        type: String
    },
    followers: {
        type: Array
    },
    following: {
        type: Array
    }
})

const User = models?.User || model("User", UserSchema);
export default User