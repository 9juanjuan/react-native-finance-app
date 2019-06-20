import React from 'react';
import {View, Button, Text, TextInput, Picker, DatePickerIOS, StyleSheet, Dimensions} from 'react-native';
import DatePicker from 'react-native-datepicker'

const screenWidth = Dimensions.get('window').width


const inputForm = props => {
    return (
        <View style={styles.container}>

            {/* <DatePickerIOS
                style={styles.datePicker}
                date={props.date}
                onDateChange={props.dateHandler}
                mode='date'
            /> */}
            <Picker
                style={styles.picker}
                selectedValue={props.type}
                onValueChange={props.typeHandler}>
                <Picker.Item label="Income" value="income" />
                <Picker.Item label="Expense" value="expense" />
            </Picker>
            <TextInput 
            editable ={true}
            style={styles.form1}
            placeholder="Add Description"
            onChangeText={props.descriptionHandler}
            value={props.description}/>

            <TextInput 
            editable ={true}
            style={styles.form2}
            placeholder="Add Amount"
            onChangeText={props.amountHandler}
            value={props.amount.toString()}/>
            <DatePicker
            style={styles.datePicker}
            date={props.date}
            mode="date"
            placeholder="select date"
            format="YYYY-MM-DD"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            onDateChange={props.dateHandler}
            />
            <Button
            style={{height: 25}}
            title="Submit" onPress={props.formHandler} />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        // borderWidth: 1,
        width: screenWidth/2,
        height: 350
      // justifyContent: 'center',
    },
    form1: {
        height: 40, 
        marginTop: 4,
        borderColor: 'gray',
        borderWidth: 1,
    },
    form2: {
        marginTop: 5,
        height: 40, 
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10
    },
    datePicker: {
        // marginTop: 10,
        width: screenWidth/2,
        // borderWidth: 1
    },
    picker: {
        // borderWidth: 1,
        height: 150,
        marginTop: -20,
        // marginBottom: 5,
        justifyContent: 'center'
    }
});

export default inputForm;