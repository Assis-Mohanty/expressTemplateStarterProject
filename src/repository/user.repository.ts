import { UserDTO } from "../dto/user.dto";
import { User } from "../models/user";

export async function createUser(createBody:UserDTO){
    const user=await User.create(createBody)
    return user
}
export async function getUser(id:number){
    const user=await User.findByPk(id)
    return user
}
export async function getAllUsers(){
    const users=await User.findAll()
    return users
}
