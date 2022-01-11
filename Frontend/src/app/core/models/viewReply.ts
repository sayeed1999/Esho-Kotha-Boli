export class ViewReply {
    constructor(
        public id: number,
        public userId: string,
        public userName: string,
        public fullName: string,
        public dateCreated: Date,
        public body: string,
        public commentId: number
    ) {}
}