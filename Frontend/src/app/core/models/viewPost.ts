import { ViewComment } from "./viewComment";

export class ViewPost {
    constructor(
        public id: number,
        public userId: string,
        public userName: string,
        public fullName: string,
        public dateCreated: Date,
        public body: string,
        public comments: ViewComment[]
    ) {}
}