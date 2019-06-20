import React from 'react';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import {View, Text } from 'react-native';

const incomeTable = props => {
    return (
        <View style={{
            marginRight: 20
        }}>
            <Text>Income</Text>
            <Table>
                <Row 
                    data={[' Date', ' Description', ' Amount']}
                    widthArr={[125, 150, 60]}/>
                <Rows
                    widthArr={[125, 150, 60]}
                    data={props.data} />
            </Table>

        </View>
    )
}

export default incomeTable;