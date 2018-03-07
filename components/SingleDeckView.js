import React,{ Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native'
import { StackNavigator } from 'react-navigation'
import { connect } from 'react-redux'
import {clearLocalNotification, setLocalNotification} from '../utils/helpers'

const ReactNavigation = require('react-navigation');
ReactNavigation.SafeAreaView.setStatusBarHeight(0);

class SingleDeckView extends Component {
  static navigationOptions = ({ navigation }) => {

    return {
      title: navigation.state.params.title
    }
  }
  render(){
    const { title } = this.props.navigation.state.params
    const deck = this.props.decks[title]
    const numberOfCards = deck.questions.length
    const modalOpener = () => {
      if(numberOfCards < 1){
        alert('There are no cards please add some cards')
        this.props.navigation.navigate('NewQuestionView',{title})
      }
      else{
        this.props.navigation.navigate('QuizView',{title,numberOfCards})
        clearLocalNotification()
          .then(setLocalNotification)
      }
    }
    return (
      <ImageBackground source={require('../img/bg2.jpg')} style={styles.container}>
        <Text style={{fontSize:40}}>{title}</Text>
        <Text style={{fontSize:20,color:'gray'}}>{deck.questions && deck.questions.length} cards</Text>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate('NewQuestionView',{title})} style={styles.addCardBtn}>
          <View>
            <Text>Add Card</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={modalOpener} style={styles.startQuiz}>
          <View>
            <Text style={{color:'white'}}>Start Quiz</Text>
          </View>
        </TouchableOpacity>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  container : {
    flex : 1,
    alignItems : 'center',
    justifyContent : 'center'
  },
  addCardBtn : {
    borderWidth: 0.5,
    marginTop: 100,
    width: 200,
    height:50,
    alignItems : 'center',
    justifyContent : 'center',
    borderRadius : 7
  },
  startQuiz : {
    backgroundColor : 'black',
    marginTop:10,

    width: 200,
    height:50,
    alignItems : 'center',
    justifyContent : 'center',
    borderRadius : 7
  }
})

const mapStateToProps = (state) => {
  return {decks:state}
}

export default connect(mapStateToProps)(SingleDeckView)
