import { Schema, model, models } from 'mongoose';

const CommentSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'Prompts',
        required: [true, 'Creator is required.'],
    },
});

const Comment = models.Comment || model('Comment', CommentSchema);

export default Comment;