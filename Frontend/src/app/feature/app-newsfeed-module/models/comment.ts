import { User } from "src/app/core/models/user";
import { Post } from "./Post";
import { Reply } from "./reply";

export class Comment_
{
    constructor
    (
        public id: number,
        public body: string,
        public dateCreated: Date,
        public postId: number,
        public userId: string,
        public replies: Reply[],
        public post?: Post,
        public user?: User
    )
    {}

    static newComment(body: string, postId: number, replies?: Reply[]) {
        return new Comment_(0, body, new Date(), postId, '', replies || []);
    }
}