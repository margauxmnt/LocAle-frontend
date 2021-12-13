export default function(userNotes = [], action){
    if(action.type === 'updateNotes') return action.userNotes
    else if(action.type === 'addUserNote'){
        let note = action.userNote
        note.beer = action.beer
        const newN = [...userNotes]
        newN.unshift(note)
        return newN
    }
    else return userNotes
}