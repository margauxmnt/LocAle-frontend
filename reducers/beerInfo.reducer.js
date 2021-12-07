export default function(beerInfo = {}, action){
    if(action.type === 'updateBeer') return action.beerInfo
    else return beerInfo
}