import { Comment_ } from './comment';

export class Post
{
    constructor
    (
        public id: number,
        public body: string,
        public dateTime: Date,
        public comments: Comment_[]    
    )
    {}

    static newPost(body: string, comments?: Comment_[]): Post {
        return new Post(0, body, new Date(), comments || []);
    }
    
}