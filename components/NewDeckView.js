import React,{ Component } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity,
  KeyboardAvoidingView, ImageBackground, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { saveDeckTitle } from '../actions'

class NewDeckView extends Component {
  state = {
    text : ''
  }

  render(){
    const saveData = () => {
      if(this.state.text.length > 0){
        this.props.dispatch(saveDeckTitle(this.state.text))
          .then(()=>this.setState({text:''}))
        this.props.navigation.navigate('DeckListView')
      }
      else{
        alert('Please fill the form to add new deck')
      }
    }
    return (
      <ImageBackground source={require('../img/bg2.jpg')} style={styles.container}>
        <KeyboardAvoidingView behavior='padding' style={{alignItems:'center'}}>
          <ImageBackground source={require('../img/card.jpeg')} style={styles.card}>
            <Text style={styles.deckText}>What is the title of your new deck?</Text>
            <TextInput
              style={styles.textInput}
              placeholderTextColor='#D3D3D3'
              placeholder='Deck title'
              onChangeText={(text)=>this.setState({text})}
              value={this.state.text}/>
          </ImageBackground>
          <TouchableOpacity
            style={styles.addCardBtn}
            onPress={saveData}
          >
            <View>
              <Text style={{color:'white'}}>Submit</Text>
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor:'dimgray',

  },
  card:{
    justifyContent:'center',
    alignItems:'center',
    height:Dimensions.get('window').width,
    backgroundColor:'#fff',
    borderWidth : 2,
    borderRadius:20,
    shadowColor: 'rgba(0, 0, 0, .5)',
    shadowOffset:{width:3,height:3},
    shadowRadius:20,
    shadowOpacity:1,
    elevation:4,
    marginLeft:10,
    marginRight:10,
    overflow:'hidden'

  },
  deckText : {
    marginLeft:10,
    marginRight:10,
    color:'#F5F5F5',
    textAlign : 'center',
    fontSize: 35
  },
  addCardBtn : {
    backgroundColor : 'black',
    marginTop: 50,
    width: 100,
    height:35,
    alignItems : 'center',
    justifyContent : 'center',
    borderRadius : 7
  },
  textInput : {
    borderWidth : 1,
    borderRadius: 7,
    color:'#F5F5F5',
    borderColor:'#F5F5F5',
    fontSize:20,
    textAlign:'center',
    width:200,
    height: 35,
    marginTop : 50
  }
})

const mapStateToProps = (state) => {
  return {decks:state}
}

export default connect(mapStateToProps)(NewDeckView)
