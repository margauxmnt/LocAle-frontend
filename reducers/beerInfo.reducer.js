export default function(beerInfo = {}, action){
    if(action.type === 'udpateBeer') return action.beerInfo
    else return beerInfo
}