export class ViewUser {
    constructor(
        public userName: string,
        public email: string,
        public firstName: string,
        public lastName: string,
        public dateOfBirth: Date,
        public sexId: number,
        public sex: string,
        public relationshipStatusId: number,
        public relationshipStatus: string,
    ) {}
}