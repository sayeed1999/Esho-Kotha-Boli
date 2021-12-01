import { Comment_ } from "./comment";
import { User } from "./user";

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