import { Schema, model, models } from 'mongoose'

const HashtagSchema = new Schema({
    hashtag: {
        type: String,
        unique: [true, 'Hashtag already exists'],
    },
    times_used: {
        type: Number,
    },
    tweets: {
        type: Array
    }

})

const Hashtag = models?.Hashtag || model("Hashtag", HashtagSchema);
export default Hashtag