import * as DBapi from '../utils/DBapi'

export const FETCH_DECKS = 'FETCH_DECKS'
export const ADD_DECKS = 'ADD_DECKS'
export const FETCH_DECK = 'FETCH_DECK'

export function receiveDecks (decks) {
  return {
    type: FETCH_DECKS,
    decks
  }
}

export function receiveDeck (deck) {
  return {
    type: FETCH_DECK,
    deck
  }
}

export function addDeck (deck) {
  return {
    type : ADD_DECK,
    deck
  }
}

export const initAsyncStorage = defaultData => dispatch => {

  return DBapi.getDecksFirstTime()
  .then(data=>{
    if(typeof data === 'string' || data instanceof String){
      DBapi.getDecks()
        .then(data => dispatch(receiveDecks(data)))
    }
    else{
      // init dB (add utils/data to AsyncStorage)
      DBapi.initAsyncStorage(defaultData)
      .then(() => DBapi.getDecks())
      .then(data => dispatch(receiveDecks(data)))
    }
  })
}

export const fetchDecks = () => dispatch => (
  DBapi.getDecks()
    .then(data => dispatch(receiveDecks(data)))
)

export const saveDeckTitle = title => dispatch => {
  return DBapi.saveDeckTitle(title)
          .then(()=>DBapi.getDecks())
          .then(data => dispatch(receiveDecks(data)))
}

export const addCardToDeck = ({title,card}) => dispatch => (
  DBapi.addCardToDeck({title,card})
    .then(()=>DBapi.getDecks())
    .then(data => dispatch(receiveDecks(data)))
)
