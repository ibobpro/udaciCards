import { AsyncStorage } from 'react-native'

export const API_KEY = 'UdaciCardsStorage:key'


export const initAsyncStorage = data => AsyncStorage.setItem(API_KEY, JSON.stringify(data))

export const getDecks = () => {
    return AsyncStorage.getItem(API_KEY)
      .then(data => JSON.parse(data))
}
export const getDecksFirstTime = () => AsyncStorage.getItem(API_KEY)

export function getDeck (id) {
    return  AsyncStorage.getItem(API_KEY)
      .then(data => JSON.parse(data))
      .then(data => data[id])
  }

export function saveDeckTitle (title) {
    return  AsyncStorage.mergeItem(API_KEY, JSON.stringify({
      [title] : {
        title : title,
        questions : []
      }
    }))
  }
export function addCardToDeck ({title, card}) {
    return AsyncStorage.getItem(API_KEY)
      .then(data => JSON.parse(data))
      .then(data => {
        let myData = data
        myData[title].questions.push(card)
        AsyncStorage.setItem(API_KEY,JSON.stringify({...myData}))
      })

  }

export function removeData(title) {
  return AsyncStorage.getItem(API_KEY)
    .then(data => JSON.parse(data))
    .then(data => {
      let myData = data
      myData[title] = undefined
      delete myData[title]
      AsyncStorage.setItem(API_KEY,JSON.stringify({...myData}))
    })
}

export function clearStorage(){
   AsyncStorage.clear()
}

// No enogh time to implement features below :-(

//export function deleteQuiz(id) {}

//export function editDeck(id) {}

// export function editQuiz(id) {}
