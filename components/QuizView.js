import React,{ Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Dimensions,ScrollView, Platform } from 'react-native'
import { connect } from 'react-redux'
import { fetchDeck } from '../actions'
import FlipCard from 'react-native-flip-card'



class QuizView extends Component {
  state = {
    flip : false,
    questionId:0,
    questionCounter:1,
    answersCount :0,
    result:0
  }
  componentDidMount(){
  }
  static navigationOptions = ({navigation}) => {
    return {
      title : "Quiz"
    }
  }
  render(){
    const deck = this.props.decks[this.props.navigation.state.params.title]
    const { flip, questionId, questionCounter, answersCount, result } = this.state
    const { title, numberOfCards } = this.props.navigation.state.params
    const correctBtn = () => {
      this.setState({
        questionId:questionId+1,
        questionCounter:questionCounter+1,
        answersCount:answersCount+1
      })
    }
    const incorrectBtn = () => {
      this.setState({
        questionId:questionId+1,
        questionCounter:questionCounter+1
      })
    }
    const restartBtn = () => {
      this.setState({
        questionId:0,
        questionCounter:1,
        answersCount:0
      })
    }
    return (
        <ImageBackground source={require('../img/bg2.jpg')} style={styles.container}>
          {(questionId-deck.questions.length === 0) ? (
            <ImageBackground source={require('../img/card.jpeg')} style={[styles.mainText,{alignItems:'center',justifyContent:'center'}]}>
              <Text style={styles.title}>You have answered to all questions.</Text>
              <Text style={[styles.title,{fontSize:20}]}>Your result is {answersCount} out of {deck.questions.length}</Text>
              <Text style={[styles.title,{fontSize:20}]}>which is {(answersCount/deck.questions.length*100).toFixed(2)}% correct answers!</Text>
              <TouchableOpacity onPress={restartBtn} style={styles.correct}>
                <View>
                  <Text style={{color:'white', fontWeight:'100'}}>Restart</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>this.props.navigation.navigate('Home')} style={styles.incorrect}>
                <View>
                  <Text style={{color:'white', fontWeight:'100'}}>Back to menu</Text>
                </View>
              </TouchableOpacity>
            </ImageBackground>
          )
          : (<FlipCard
            friction={6}
            style={styles.flipCard}
            perspective={1000}
            flipHorizontal={true}
            flipVertical={false}
            flip={flip}
            clickable={false}
            onFlipEnd={(isFlipEnd)=>{console.log('isFlipEnd', isFlipEnd)}}
          >
              {/* Face Side */}
            <ImageBackground source={require('../img/card.jpeg')} style={styles.mainText}>
              <ScrollView contentContainerStyle={styles.scrollView}>
                <Text style={{color:'#F5F5F5'}}>{questionCounter}/{numberOfCards}</Text>
                <Text style={styles.answer}>{title}</Text>
                <Text style={styles.title}>{deck.questions[questionId].question}</Text>
                <TouchableOpacity onPress={()=>this.setState({flip:!this.state.flip})}>
                  <Text
                    style={[styles.answer,Platform.OS === 'ios' ? styles.anserIos : styles.answerAndroid ]}
                  >Show Answer</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={correctBtn} style={styles.correct}>
                  <View>
                    <Text style={{color:'white', fontWeight:'100'}}>Correct</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={incorrectBtn} style={styles.incorrect}>
                  <View>
                    <Text style={{color:'white', fontWeight:'100'}}>Incorrect</Text>
                  </View>
                </TouchableOpacity>
              </ScrollView>
            </ImageBackground>
              {/* Back Side */}
              <ImageBackground source={require('../img/card.jpeg')} style={styles.mainText}>
                <ScrollView contentContainerStyle={styles.scrollView}>
                  <Text style={{color:'#F5F5F5'}}>{questionCounter}/{numberOfCards}</Text>
                  <Text style={styles.answer}>{title}</Text>
                  <Text style={styles.title}>{deck.questions[questionId].answer}</Text>
                  <TouchableOpacity onPress={()=>this.setState({flip:!this.state.flip})}>
                    <Text style={[styles.answer,{marginTop:30,fontSize:20}]}>Back</Text>
                  </TouchableOpacity>
                </ScrollView>
              </ImageBackground>
            </FlipCard>)}
          </ImageBackground>

    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'dimgray',
    alignItems : 'center',
    justifyContent: 'center',
  },
  anserIos:{
    marginTop:50,fontSize:20
  },
  answerAndroid:{
    marginTop:20,fontSize:15
  },
  scrollView:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  flipCard:{
    flex:1,
    marginTop:90,
    justifyContent: 'center',
    alignItems:'center',
    borderWidth:0
  },
  answer:{
    color:'#ED1C24',
    fontWeight: 'bold'
  },
  mainText:{
    width:Dimensions.get('window').width-30,
    height:Dimensions.get('window').width,
    alignItems:'center',
    borderRadius:20,
    margin:20,
    shadowColor: 'rgba(0, 0, 0, .5)',
    shadowOffset:{width:3,height:3},
    shadowRadius:20,
    shadowOpacity:1,
    elevation:4,
    overflow:'hidden'
  },
  title : {
    color:'#F5F5F5',
    fontSize : Platform.OS === 'ios' ? 40 : 20,
    textAlign:'center'
  },
  numberOfCards : {
    fontSize : Platform.OS === 'ios' ? 20 : 10,
    color : 'gray'
  },
  correct : {
    backgroundColor : 'green',
    marginTop: Platform.OS === 'ios' ? 50 : 20,
    width: 150,
    height:35,
    alignItems : 'center',
    justifyContent : 'center',
    borderRadius : 7
  },
  incorrect : {
    backgroundColor:'#ED1C24',
    marginTop:10,
    borderWidth: 0.5,
    width: 150,
    height:35,
    alignItems : 'center',
    justifyContent : 'center',
    borderRadius : 7
  }
})

const mapStateToProps = (state) => {
  return {decks:state}
}

export default connect(mapStateToProps)(QuizView)
