import React,{ Component } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Dimensions, ImageBackground } from 'react-native'
import SingleDeckView from './SingleDeckView'
import { connect } from 'react-redux'
import { fetchDecks, initAsyncStorage, saveDeckTitle } from '../actions'
import { defaultData } from '../utils/defaultData'

const ListView = ({title,numberOfCards,navigation}) => {
  return (
    <TouchableOpacity onPress={()=>navigation.navigate('SingleDeckView',{title,numberOfCards})}>
      <ImageBackground source={require('../img/card.jpeg')} style={styles.listView}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.numberOfCards}>{numberOfCards} cards</Text>
      </ImageBackground>
    </TouchableOpacity>
  )
}

class DeckListView extends Component {
  state = {
    loaded : false
  }
  componentDidMount() {
    const { dispatch } = this.props
    // fetch data from AsyncStorage
  dispatch(initAsyncStorage(defaultData))
      .then((data)=>this.setState({loaded:true}))
  }
  renderItem = ({item}) => {
    return <ListView title={item.title} numberOfCards={item.questions && item.questions.length} navigation={this.props.navigation} />
  }

  render(){
    const list = this.props.decks
    return (
     <ImageBackground style={styles.container} source={require('../img/bg2.jpg')}>
        {this.state.loaded
          ? <FlatList
            data={this.props.decks}
            renderItem={this.renderItem}
            keyExtractor={item => item.title}
          />
          : <View style={styles.loader}>
              <ActivityIndicator color="#00ff00" />
            </View>}
        </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'rgba(0,0,0,0)',
  },
  loader: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listView : {
    flex : 1,
    alignItems : 'center',
    backgroundColor:'rgba(0,0,0,0)',
    justifyContent : 'center',
    height:Dimensions.get('window').width,
    borderRadius:20,
    margin:20,
    shadowColor: '#000',
    shadowOffset:{width:8,height:8},
    shadowRadius:20,
    shadowOpacity:1,
    elevation:4,
    overflow:'hidden'
  },
  title : {
    color:'#F5F5F5',
    fontSize : 40
  },
  numberOfCards : {
    fontSize : 20,
    color : 'gray'
  }
});
/*
const mapStateToProps = (state) => {
  return {decks : state}
}
*/
const mapStateToProps = (state) => {
  const objToArrState = Object.keys(state)
  return {decks : objToArrState.map((key)=>state[key])}
}

export default connect(mapStateToProps)(DeckListView)
