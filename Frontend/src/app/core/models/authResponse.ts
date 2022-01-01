export class AuthResponse {
    constructor(
        public userName: string,
        public isAuthSuccessful: boolean,
        public message: string,
        public token: string
    ) {}
}