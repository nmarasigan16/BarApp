import React, { Component } from 'react';
import {
    View,
    FlatList,
} from 'react-native';
import {colorScheme} from "../../../../lib/styles/ColorScheme";
import RailCardRow from './RailCardRow';

const RailCardLayout = ({object}) => {

    const arr = Object.keys(object).map((key) => {
        return {beerName: key, value: object[key]}
    });

    arr.forEach((row, i) => {
        row.key = i + 1;
    });


    return (
        <View style={{
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: 20,
            marginBottom: 20,
        }}>
            <FlatList
                data={arr}
                keyExtractor={(item) => item.key}
                renderItem={({item}) => <RailCardRow row={item}/>}
                />
        </View>
    )
};

export default RailCardLayout;
