import React, { Component } from 'react';
import {
    View,
    FlatList,
} from 'react-native';
import {colorScheme} from "../../../../lib/styles/ColorScheme";
import RailCardRow from './RailCardRow';

const RailCardLayout = ({rows}) => {

    rows.forEach((item, i) => {
        item.key = i + 1;
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
                data={rows}
                keyExtractor={(item) => item.key}
                renderItem={({item}) => <RailCardRow row={item}/>}
                />
        </View>
    )
};

export default RailCardLayout;
