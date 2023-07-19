import { Schema, model, models } from 'mongoose';

const PromptSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    prompt: {
        type: String,
        required: [true, 'Prompt is required.'],
    },
    tag: {
        type: Array,
    },
    original_tag: {
        type: Array,
    },
    likes: {
        type: Number,
    },
    number_of_retweets: {
        type: Number
    },
    likeIds: {
        type: Array
    },
    image: {
        type: String
    },
    createdAt: {
        type: Date
    },
    comments: {
        type: Array
    },
    is_retweet: {
        type: Boolean
    },
    retweeter: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    original_id: {
        type: String
    },
    retweet_data: {
        quote: { type: String },
        quote_image: { type: String },
        retweet_created_at: { type: Date }
    }
});

const Prompt = models?.Prompt || model('Prompt', PromptSchema);
//const Prompt = models.Prompt ? models.Prompt : model('Prompt', PromptSchema);

export default Prompt;