import { User } from "./user";

export class Task {
    id!:number;
    createdAt!:Date;
    description!:string;
    status!:string;
    title!:string;
    updateAt!:Date;
    user!:User;
}
