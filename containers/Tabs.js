import { TabNavigator } from 'react-navigation'
import DeckListView from '../components/DeckListView'
import NewDeckView from '../components/NewDeckView'
import { MaterialIcons } from '@expo/vector-icons'
import { Platform } from 'react-native'
import React from 'react'

const Tabs = TabNavigator({
  DeckListView : {
    screen : DeckListView,
    navigationOptions : {
      tabBarLabel : 'Decks',
      tabBarIcon : ({ tintColor }) => <MaterialIcons name='library-books' size={30} color={tintColor} />
    }
  },
  NewDeckView : {
    screen : NewDeckView,
    navigationOptions : {
      tabBarLabel : 'New Deck',
      tabBarIcon : ({ tintColor }) => <MaterialIcons name='library-add' size={30} color={tintColor} />
    }
  }
},{
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? 'black' : 'white',
    style:{
      height:55,
      backgroundColor: Platform.OS === 'ios' ? 'white' : 'gray',
      shadowColor: 'rgba(0,0,0,0.2)',
      shadowOffset:{
        width:0,
        height:3
      },
      shadowRadius:6,
      shadowOpacity:1
    }
  }
})

export default Tabs
