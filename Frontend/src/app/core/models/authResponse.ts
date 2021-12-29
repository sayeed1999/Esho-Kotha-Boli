export class AuthResponse {
    constructor(
        public userName: string,
        public isAuthSuccessful: boolean,
        public errorMessage: string,
        public token: string
    ) {}
}