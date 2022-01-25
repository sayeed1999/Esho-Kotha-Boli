import { User } from 'src/app/core/models/user';
import { Comment_ } from './comment';

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