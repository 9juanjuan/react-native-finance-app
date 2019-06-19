import React from 'react';
import {View, Button, Text, TextInput, Picker} from 'react-native';

const inputForm = props => {
    return (
        <View style={{
            width: 165,
            height: 300
        }}>
            <Picker
                selectedValue={props.type}
                onValueChange={props.typeHandler}>
                <Picker.Item label="Income" value="income" />
                <Picker.Item label="Expense" value="expense" />
            </Picker>

            <TextInput 
            editable ={true}
            style={{
                height: 20, 
                borderColor: 'gray',
                borderWidth: 1
            }}
            placeholder="Add Description"
            onChangeText={props.descriptionHandler}
            value={props.description}/>
            
            <TextInput 
            editable ={true}
            style={{
                marginTop: 5,
                height: 20, 
                borderColor: 'gray',
                borderWidth: 1
            }}
            placeholder="Add Amount"
            onChangeText={props.amountHandler}
            value={props.amount.toString()}/>

            <Button
            style={{height: 25}}
            title="Submit" onPress={props.formHandler} />
        </View>
    )
}

export default inputForm;