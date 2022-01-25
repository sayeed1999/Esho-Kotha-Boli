import { User } from "src/app/core/models/user";
import { Comment_ } from "./comment";

export class Reply
{
    constructor
    (
        public id: number,
        public body: string,
        public dateCreated: Date,
        public commentId: number,
        public userId: string,
        public comment?: Comment_,
        public user?: User
    )
    {}

    static newReply(body: string, commentId: number): Reply {
        return new Reply(0, body, new Date(), commentId, '');
    }

}