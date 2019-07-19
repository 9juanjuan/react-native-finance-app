import React from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView, Button} from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';
import { createSwitchNavigator, createAppContainer, createDrawerNavigator, createBottomTabNavigator, createStackNavigator} from 'react-navigation'
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
var data =[ 
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

class DashboardScreen extends React.Component {
  constructor(props) {
  super(props);
  this.state = {
    type: 'income',
    amount: '',
    category: '',
    description: '',
    color: '',
    chosenDate: today
  }
}

_getUserInput = () => {
  console.log(data)
if(isNaN(parseInt(this.state.amount)) || this.state.description=== '' ){
  console.log('No description or not a number')
} else {
if (this.state.type === 'income') {
  console.log('Income amount is : '+this.state.amount)
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
  [...data]
  
  // data.map((entry)=> {
  //   console.log(entry.type)
  //   if (entry.type === 'income' && entry.id in data === false) {
      incomeData.push([this.state.chosenDate, this.state.description, this.state.amount])
  //   }
  // })
  console.log(incomeData);

} else if (this.state.type ==='expense') {
  console.log('The expense is : '+this.state.amount)
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
  console.log(expenseData)
  }
}

setTimeout(() => {
  this.setState({
  // type: 'income',
  amount: '',
  category: '',
  description: ''
})}, 500 )
// Resets input fields

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
    <View style={styles.container}>
      <Title/>
      <InputForm formHandler={this._getUserInput} descriptionHandler={this._getUserText} typeHandler={this._getType} amountHandler={this._getUserAmount} dateHandler={this._setDate} description={this.state.description} type={this.state.type} amount={this.state.amount} date={this.state.chosenDate} />
      <Button title="View Financial Data" onPress={() =>
      this.props.navigation.navigate('Financial Data')} />
  </View>
  )};
}


class PieChartView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    newData: []
  }
}

componentDidUpdate(prevProps, prevState) {
  // only update chart if the data has changed
  console.log('*********pie chart state***********')

  console.log(this.state.newData)
  console.log('*********pie chart state***********')

  if (prevState.newData !== data) {
    // this.chart = c3.load({
    //   data: this.props.data
    // });
    console.log('*********pie chart state***********')
    console.log(this.state.newData)
    console.log('*********pie chart state***********')

    this.setState({ 
      newData: data
    })
  }
}
  componentDidMount () {
    // setInterval(()=> {
    //   // A big no no, will work on alternate solution that doesn't involve this
    //   this.forceUpdate()
    // },2000)
    // console.log('oldstate is: '+this.state.newData)
    this.setState({ 
      newData: data
    })
    // console.log('newstate is: '+this.state.newData)
  }

  render () {
    return (
      <View style={{ flex:1, alignItems: 'center', justifyContent: 'center'}}>
        <Text> PieChart view </Text>
        { data.length > 0 ? <PieChart
                data={this.state.newData}
                width={screenWidth}
                height={200}
                chartConfig={{
                  backgroundGradientFrom: '#1E2923',
                  backgroundGradientTo: '#08130D',
                  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`
                }}
                accessor="amount"
                backgroundColor="transparent"
          /> : <Text> No Data to show</Text>}
         
         
      </View>
    )
  }
}

class SpreadSheetView extends React.Component {
  render () {
    return (
      <View style={{ flex:1, alignItems: 'center', justifyContent: 'center'}}>
        <IncomeTable data={incomeData}/>
        <ExpenseTable data={expenseData}/>
      </View> 
    )
  }
}

class LineChartView extends React.Component {
  render () {
    return (
      <View style={{ flex:1, alignItems: 'center', justifyContent: 'center'}}>
        <LineChart data ={lineData} height={200} width={screenWidth} chartConfig={chartConfig}
        />     
       </View> 
    )
  }
}

const DataTabNavigator = createBottomTabNavigator({
  PieChartView, 
  SpreadSheetView,
  LineChartView
}, {
  navigationOptions:({navigation})=> {
    const {routeName} = navigation.state.routes[navigation.state.index];
    return {
      headerTitle: routeName
    }
  }
})
const DataStackNavigator = createStackNavigator({
  DataTabNavigator: DataTabNavigator,
}, {defaultNavigationOptions:({navigation})=> {
  return {
    headerLeft:(
      <Icon style={{paddingLeft: 10}} onPress={()=>navigation.openDrawer()} name="md-menu" size={30} /> 
    )
  }
}});

const DashboardStackNavigator = createStackNavigator({
  DashboardScreen: DashboardScreen,
}, {defaultNavigationOptions:({navigation})=> {
  return {
    headerLeft:(
<Icon style={{paddingLeft: 10}} onPress={()=>navigation.openDrawer()} name="md-menu" size={30} />     )
  }
}});
const AppDrawerNavigator = createDrawerNavigator({
  'Data Input': {
    screen: DashboardStackNavigator
  },
  'Financial Data': {
    screen: DataStackNavigator
  }
});
const AppSwitchNavigator = createSwitchNavigator({
    MainScren: {screen: AppDrawerNavigator} 
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
