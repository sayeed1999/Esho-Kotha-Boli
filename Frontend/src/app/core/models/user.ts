export class User {
    constructor(
        public id: string,
        public userName: string,
        public firstName: string,
        public lastName: string,
        public dateOfBirth: Date,
        public sex: number,
        public relationshipStatus: number,
        public email: string,
    ) {}
}