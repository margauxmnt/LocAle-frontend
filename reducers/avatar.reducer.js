export default function(avatar = '', action){
    // console.log(action.avatar);
    if(action.type === 'addAvatar') return action.avatar
    else return avatar
}