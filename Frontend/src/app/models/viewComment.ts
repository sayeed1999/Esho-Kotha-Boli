import { ViewReply } from "./viewReply";

export class ViewComment {
    constructor(
        public id: number,
        public userId: string,
        public userName: string,
        public dateCreated: Date,
        public body: string,
        public postId: number,
        public replies: ViewReply[]
    ) {}
}