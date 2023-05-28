import Mock from "mockjs";
import AvatarList from "./avatar.static"

export const getAvatar = ()=>{
    return {
        code:200,
        data:AvatarList
    }
}