import React from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView} from 'react-native';
import { createSwitchNavigator, createAppContainer} from 'react-navigation'
import Title from './components/Title';
import InputForm from './components/InputForm';
import ExpenseTable from './components/ExpenseTable'
import IncomeTable from './components/IncomeTable';
import { PieChart, LineChart } from 'react-native-chart-kit';
import colors from './colors.js';
const uuid = require('uuidv4');
const colorChooser = colors
const screenWidth = Dimensions.get('window').width

// import console= require('console');
const chartConfig = {
  backgroundGradientFrom: '#1E2923',
  backgroundGradientTo: '#08130D',
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 1 // optional, default 3
}
const data =[ 
  // { name: 'Food', amount: 200, color: 'red', legendFontColor: 'red', legendFontSize: 10},
  // { name: 'Movies', amount: 50, color: '#ff6666', legendFontColor: 'red', legendFontSize: 10},
  // { name: 'Clothes', amount: 150, color: '#ffe6e6', legendFontColor: 'red', legendFontSize: 10},
  // { name: 'Work', amount: 1000, color: '#33cc33', legendFontColor: 'green', legendFontSize: 10}
]
const lineData= {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [{
    data: [ 20, 45, 28, 80, 99, 43 ]
  }]
}
var incomeData = [];
var expenseData = [];
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
today = yyyy + '-' + mm + '-' + dd


export default class App extends React.Component {
    render() {
      return <AppContainer/>
  }
}

class DashboardScreen extends Component {
  state = {
    type: 'income',
    amount: '',
    category: '',
    description: '',
    color: '',
    chosenDate: today,
    submitted: false
  }

_getUserInput = () => {
console.log(parseInt(this.state.amount));
if(isNaN(parseInt(this.state.amount)) || this.state.description=== '' ){
  console.log('No description or not a number')
} else {
if (this.state.type === 'income') {
  let randColor = colorChooser.greens[Math.floor(Math.random()*7)];
  data.push({
    name: this.state.description+' +'+parseInt(this.state.amount),
    amount: parseInt(this.state.amount),
    color: randColor,   
    legendFontColor: 'green',
    legendFontSize: 10,
    date: this.state.chosenDate,
    type: this.state.type,
    id: uuid()
  });
  
  // data.map((entry)=> {
  //   console.log(entry.type)
  //   if (entry.type === 'income' && entry.id in data === false) {
      incomeData.push([this.state.chosenDate, this.state.description, this.state.amount])
  //   }
  // })
  console.log(incomeData);

} else if (this.state.type ==='expense') {
  let randColor = colorChooser.reds[Math.floor(Math.random()*7)];
  data.push({
    name: this.state.description+ ' -'+parseInt(this.state.amount),
    amount: parseInt(this.state.amount),
    color: randColor,   
    legendFontColor: 'red',
    legendFontSize: 10,
    date: this.state.chosenDate,
    type: this.state.type,
    id: uuid()
  });
  // data.map((entry)=> {
  //   if (entry.type === 'expense' ) {
  //     expenseData.push([entry.date, this.state.description, entry.amount])
  //   }
  // })
  expenseData.push([this.state.chosenDate, this.state.description, this.state.amount])
}
}


// Resets input fields
this.setState({
  type: 'income',
  amount: '',
  category: '',
  description: '',
  submitted: true
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
this.setState({
    amount: text
})
console.log(this.state.amount)
}
_getType = (itemValue, itemIndex ) => {
const value = itemValue 
this.setState({
    type: value
})
}
_setDate = (newDate) => {
console.log(newDate)
this.setState({chosenDate: newDate});

}


render () {
return (
  //  AppContainer will contain the app eventually but need to figure out how to wrap existing app components

  // <AppContainer/>
    <View style={styles.container}>
      <Title/>
      <InputForm formHandler={this._getUserInput} descriptionHandler={this._getUserText} typeHandler={this._getType} amountHandler={this._getUserAmount} dateHandler={this._setDate} description={this.state.description} type={this.state.type} amount={this.state.amount} date={this.state.chosenDate} />
    {/* </View> */}
    { this.state.submitted ?
         <ScrollView
         style={{borderWidth: 1, height: 300}}
         horizontal={true}
         >
       <View style={styles.chart}>
          <Text>Percentage Breakdown</Text>
            <PieChart
                data={data}
                width={screenWidth}
                height={200}
                chartConfig={{
                  backgroundGradientFrom: '#1E2923',
                  backgroundGradientTo: '#08130D',
                  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`
                }}
                accessor="amount"
                backgroundColor="transparent"
              />
           <Text>Swipe for chart</Text>
         </View>
         <IncomeTable data={incomeData}/>
         <ExpenseTable data={expenseData}/>
         <LineChart 
            data ={lineData}
            height={200}
            width={screenWidth}
            chartConfig={chartConfig}

          />
         </ScrollView>
      
      : null}
   
  </View>
  )};
}

class SpreadsheetScreen extends Component {
  render () {
    return (
      <View style={{ flex:1, alignItems: 'center', justifyContent: 'center'}}>
        <Text> SpreadSheetScreen</Text>
      </View>
    )
  }
}

const AppSwitchNavigator = createSwitchNavigator({
    Dashboard: {screen: DashboardScreen},
    Spreadsheet: {screen: SpreadsheetScreen} 
})

const AppContainer = createAppContainer(AppSwitchNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  chart: {
    // marginTop: 400,
    // marginLeft: 20,
    justifyContent: 'flex-start',
    alignContent: 'center',
    alignItems: 'center'
  }

});
