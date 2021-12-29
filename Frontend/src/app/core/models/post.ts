import { Comment_ } from './comment';
import { User } from './user';

export class Post
{
    constructor
    (
        public id: number,
        public body: string,
        public dateCreated: Date,
        public userId: string,
        public comments: Comment_[],
        public user?: User
    )
    {}

    static newPost(body: string, comments?: Comment_[]): Post {
        return new Post(0, body, new Date(), '', comments || []);
    }
    
}