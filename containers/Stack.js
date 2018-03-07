import { StackNavigator } from 'react-navigation'
import Tabs from './Tabs'
import SingleDeckView from '../components/SingleDeckView'
import QuizView from '../components/QuizView'
import NewQuestionView from '../components/NewQuestionView'

const Stack = StackNavigator({
  Home : {
    screen : Tabs,
    navigationOptions: {
      header : null
    }
  },
  SingleDeckView: {
    screen : SingleDeckView,
    navigationOptions : {
      headerTintColor:'white',
      headerStyle: {
        backgroundColor:'dimgray'
      }
    }
  },
  QuizView : {
    screen : QuizView,
    navigationOptions : {
      headerTintColor:'white',
      headerStyle: {
        backgroundColor:'dimgray'
      }
    }
  },
  NewQuestionView : {
    screen : NewQuestionView,
    navigationOptions : {
      headerTintColor:'white',
      headerStyle: {
        backgroundColor:'dimgray'
      }
    }
  }
})

export default Stack
