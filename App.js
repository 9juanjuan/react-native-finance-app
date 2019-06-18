import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Title from './components/Title';
import InputForm from './components/InputForm'
// import console= require('console');


export default class App extends React.Component {
  state = {
        type: 'income',
        amount: 0,
        category: '',
        description: ''
      }
  

  _getUserInput = () => {
    console.log('hello')
    // this.setState({
    //  log: {

       // }
    // })
  }
  _getUserText = (text) => {
    console.log(text);
    this.setState({
        description: text
    })
  }
  _getType = (event ) => {
    console.log(event);
    console.log(event.target);
    console.log(event.target.value);
    const typeValue= event.target.value;

    this.setState({
      ...this.state,
        type: typeValue
    })
  }

  render () {
    return (
      <View style={styles.container}>
        <Title/>
        <InputForm formHandler={this._getUserInput} descriptionHandler={this._getUserText} typeHandler={this._getType} description={this.state.description} type={this.state.type}/>
      </View>
    );
  }
}


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      // justifyContent: 'center',
    },

  });
