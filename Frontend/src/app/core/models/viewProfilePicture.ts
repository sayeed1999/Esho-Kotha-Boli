export class ViewProfilePicture {
    constructor(
        public id: number,
        public byteArray: string, // ArrayBuffer,
        public dateCreated: Date
    ) {}
}