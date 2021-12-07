export default function(breweriesList=[], action) {
    if(action.type == 'addLocalBreweries') {
         return [...breweriesList, action.newBreweries];
     }else {
         return breweriesList;
     };
    }    