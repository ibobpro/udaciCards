import { FETCH_DECKS, FETCH_DECK, ADD_DECK } from '../actions'

initialState = {}
function decks (state= initialState, action) {
  const {decks, type } = action
  switch (action.type) {
    case FETCH_DECKS :
      return decks
    default :
      return state
  }
}

export default decks
