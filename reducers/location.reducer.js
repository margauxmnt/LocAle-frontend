export default function(location = {}, action){
    if(action.type === 'userLocalisation') return action.location
    else return location
}