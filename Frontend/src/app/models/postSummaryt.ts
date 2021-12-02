export class PostSummary {
    constructor(
        public id: number
        ,public userName: string
        ,public dateCreated: Date
        ,public body: string
        ,public commentsCount: number
        ,public repliesCount: number
    ) {}
}