export class Message {
    constructor(
        public id: number,
        public body: string,
        public userId: string,
        public to: string,
        public dateCreated: Date,
    ) {}
}