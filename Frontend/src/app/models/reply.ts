import { Comment_ } from "./comment";

export class Reply
{
    constructor
    (
        public id: number,
        public body: string,
        public dateTime: Date,
        public commentId: number,
        public comment?: Comment_
    )
    {}

    static newReply(body: string, commentId: number): Reply {
        return new Reply(0, body, new Date(), commentId);
    }

}