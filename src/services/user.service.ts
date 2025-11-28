import { UserDTO } from "../dto/user.dto";
import { createUser, getAllUsers, getUser } from "../repository/user.repository";

export async function createUserService(createBody:UserDTO) {
    const user=await createUser(createBody);
    return user
}

export async function getUserService(id:number) {
    const user=await getUser(id)
    return user
}

export async function getAllUsersService() {
    const user=await getAllUsers();
    return user
}