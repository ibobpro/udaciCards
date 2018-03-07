import React from 'react'
import { StyleSheet, View, StatusBar } from 'react-native'
import Stack from './containers/Stack'
import UdaciStatusBar from './containers/UdaciStatusBar'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import reducer from './reducers'
//import { composeWithDevTools } from 'remote-redux-devtools'
import { setLocalNotification } from './utils/helpers'

//  composeWithDevTools(applyMiddleware(thunk)))

export default class App extends React.Component {
  componentDidMount(){
    setLocalNotification()
  }
  render() {
    const store = createStore(reducer,applyMiddleware(thunk))

    return (
      <Provider store={store}>
        <View style={styles.container}>
          <UdaciStatusBar backgroundColor="dimgray" barStyle="light-content" />
          <Stack />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#000',
    flex: 1,
    margin : 0,
    padding : 0
  },
});
