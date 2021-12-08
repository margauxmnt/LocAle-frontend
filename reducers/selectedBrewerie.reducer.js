export default function(selectedBrewerie = '', action){
    if(action.type === 'selectedBrewerie') return action.Id
    else return selectedBrewerie
}