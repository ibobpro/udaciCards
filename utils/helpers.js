import {AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'

const NOTIFICATION_KEY = 'UdaciCards:notifications'


export function clearLocalNotification () {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

export function createNotification () {
  return {
    title:'Come and study again :-)',
    body:'Dont forget to study Today!',
    ios:{
      sound:true
    },
    android:{
      sound:true,
      priority:'high',
      sticky:false,
      vibrate:true
    }
  }
}

export function setLocalNotification () {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then((data)=>JSON.parse(data))
    .then((data)=>{
      if(data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
        .then(({status})=>{
            if(status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate()+1)
              tomorrow.setHours(20)
              tomorrow.setMinutes(0)

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day'
                }
              )

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))

            }
        })
      }
    })
}
