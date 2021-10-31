import { Post } from "./Post";
import { Reply } from "./reply";

export class Comment_
{
    constructor
    (
        public id: number,
        public body: string,
        public dateTime: Date,
        public postId: number,
        public replies: Reply[],
        public post?: Post,
    )
    {}

    static newComment(body: string, postId: number, replies?: Reply[]) {
        return new Comment_(0, body, new Date(), postId, replies || []);
    }
}