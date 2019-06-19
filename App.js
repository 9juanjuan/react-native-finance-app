import React from 'react';
import { StyleSheet, Text, View, Dimensions} from 'react-native';
import Title from './components/Title';
import InputForm from './components/InputForm'
import { PieChart } from 'react-native-chart-kit'
const screenWidth = Dimensions.get('window').width
// import console= require('console');
const data =[ 
  { name: 'Food', amount: 200, color: 'red', legendFontColor: 'red', legendFontSize: 10},
  { name: 'Movies', amount: 50, color: '#ff6666', legendFontColor: 'red', legendFontSize: 10},
  { name: 'Clothes', amount: 150, color: '#ffe6e6', legendFontColor: 'red', legendFontSize: 10},
  { name: 'Work', amount: 1000, color: '#33cc33', legendFontColor: 'green', legendFontSize: 10}
]

export default class App extends React.Component {
  state = {
        type: 'income',
        amount: '',
        category: '',
        description: ''
      }
  
  _getUserInput = () => {
    console.log(this.state.type)
    data.push({
      name: this.state.description,
      amount: this.state.amount,
      color: 'green',   
      legendFontColor: 'green',
      legendFontSize: 10
    })
    // Resets input fields
    this.setState({
      type: 'income',
      amount: '',
      category: '',
      description: ''
    })
  }
  _getUserText = (text) => {
    console.log(text);
    this.setState({
        description: text 
    })
  }
  _getUserAmount = (text) => {
    console.log(text);
    const amount = parseInt(text) 
    this.setState({
        amount
    })
    console.log(this.state.amount)
  }

  _getType = (itemValue, itemIndex ) => {
    const value = itemValue 
    this.setState({
        type: value
    })
  }

  render () {
    return (
      <View>
        <View style={styles.container}>
          <Title/>
          <InputForm formHandler={this._getUserInput} descriptionHandler={this._getUserText} typeHandler={this._getType} amountHandler={this._getUserAmount} description={this.state.description} type={this.state.type} amount={this.state.amount} />
        </View>
        <View style={styles.chart}>
          <PieChart
              data={data}
              width={screenWidth}
              height={220}
              chartConfig={{
                backgroundGradientFrom: '#1E2923',
                backgroundGradientTo: '#08130D',
                color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`
              }}
              accessor="amount"
              backgroundColor="transparent"
            />
          </View>
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
    chart: {
      flex: 1,
      marginTop: 400,
      marginLeft: 30,
      justifyContent: 'flex-start',
      alignContent: 'center',
      alignItems: 'center'
    }

  });
