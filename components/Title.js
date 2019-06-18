import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

const title= () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Welcome, User!</Text>
        </View>
    )

}
const styles = StyleSheet.create({
    container: {
    //   flex: 1,
      marginTop: 20,
      height: 50,
      width: 200,
      backgroundColor: '#46f4a6',
      alignItems: 'center',
      justifyContent: 'center',
      alignContent: 'flex-start',
      borderStyle: 'solid',
      borderColor: 'lightgray',
      borderWidth: 1,
    },
    // text: {
    //     alignContent
    // }

  });

export default title; 