import React,{ Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, ImageBackground } from 'react-native'
import { addCardToDeck } from '../actions'
import { connect } from 'react-redux'
import { grayishBlack } from '../utils/colors'

class NewQuestionView extends Component {
  state = {
    question : '',
    answer : ''
  }
  static navigationOptions = ({navigation}) => {
    return {
      title : 'Add Card'
    }
  }
  render(){
    const { question, answer } = this.state
    const { dispatch, navigation} = this.props
    const saveQuiz = () => {
      if(question.length > 0 && answer.length > 0){
        const card = {question,answer}
        const {title} = navigation.state.params
        this.props.dispatch(addCardToDeck({title,card}))
        .then(()=>this.setState({question:'',answer:''}))
        this.props.navigation.navigate('SingleDeckView',{title})
      }
      else{
        alert('Please fill the form to add new card')
      }
    }
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
      <ImageBackground style={styles.container} source={require('../img/bg2.jpg')}>
        <TextInput
          style={styles.textInput}
          placeholder='Question'
          value={question}
          placeholderTextColor={grayishBlack}
          onChangeText={(text)=>this.setState({question:text})}
        />
        <TextInput
          style={styles.textInput}
          placeholder='Answer'
          value={answer}
          placeholderTextColor={grayishBlack}
          onChangeText={(text)=>this.setState({answer:text})}
        />
        <TouchableOpacity
          style={styles.addCardBtn}
          onPress={saveQuiz}
        >
          <View>
            <Text style={{color:'white'}}>Submit</Text>
          </View>
        </TouchableOpacity>
      </ImageBackground>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center',
    paddingLeft : 20,
    paddingRight : 20,
    backgroundColor:'rgba(0,0,0,0)'
  },
  deckText : {
    textAlign : 'center',
    fontSize: 35
  },
  addCardBtn : {
    backgroundColor : grayishBlack,
    marginTop: 50,
    width: 100,
    height:35,
    alignItems : 'center',
    justifyContent : 'center',
    borderRadius : 7
  },
  textInput : {
    width : 300,
    borderWidth : 3,
    borderRadius: 7,
    height: 60,
    marginTop : 50,
    color:grayishBlack,
    borderColor:grayishBlack,
    fontWeight:'900',
    fontSize:20,
    textAlign:'center',
  }
})

export default connect()(NewQuestionView)
