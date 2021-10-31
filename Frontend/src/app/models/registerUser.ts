export class RegisterUser {
    constructor(
        public userName: string,
        public firstName: string,
        public lastName: string,
        public dateOfBirth: Date,
        public sex: number,
        public relationshipStatus: number,
        public email: string,
        public password: string,
        public confirmPassword: string,
    ) {}
}