import React from 'react';
import {View, Button, Text, TextInput, Picker, DatePickerIOS, StyleSheet, Dimensions} from 'react-native';
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

            <Button
            style={{height: 25}}
            title="Submit" onPress={props.formHandler} />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        // borderColor: 'black',
        borderWidth: 1,
        width: screenWidth,
        height: 500
      // justifyContent: 'center',
    },
    form1: {
        height: 23, 
        width: 150,
        borderColor: 'gray',
        borderWidth: 1,
    },
    form2: {
        marginTop: 5,
        height: 20, 
        borderColor: 'gray',
        borderWidth: 1
    },
    datePicker: {
        width: screenWidth
    },
    picker: {
        // marginTop: -10,
        justifyContent: 'center'
    }
});

export default inputForm;