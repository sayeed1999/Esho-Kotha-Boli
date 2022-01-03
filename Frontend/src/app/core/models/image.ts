import { Byte } from "@angular/compiler/src/util";
import { User } from "./user";

export class Image {
    constructor(
        public id: number,
        public byteArray: Byte[],
        public dateCreated: Date,
        public userId: string,
        public user?: User
    ){}

    static newImage(byteArray: Byte[]): Image {
        return new Image(0, byteArray, new Date(), '');
    }
}