import { UserDTO } from "../dto/user.dto";
import { createUser, getAllUsers, getUser, updateUser } from "../repository/user.repository";

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
export async function deleteUserService(id:number) {
    const user=await getUser(id);
    if(!user){
        return null;
    }
    await user.update({deletedAt: new Date()});
    return true;
}

export async function updateUserService(id:number,updateBody:Partial<UserDTO>) {
    const updatedUser=await updateUser(id,updateBody);
    return updatedUser;
}

export async function addMoneyBalance(money:number,id:number) {
    const user=await getUser(id);
    if(!user){
        return null;
    }
    user.walletBalance += money;
    await user.save();
    return user;
}