import React, { Component } from 'react';
import {
    View,
    FlatList,
} from 'react-native';
import SpecialRowComponent from "./SpecialRowComponent";
import Text from '../general/text/TextComponent';
import {colorScheme} from "../../lib/styles/ColorScheme";

const SpecialLayout = ({specials}) => {
    const tempSpecials = [
        {
            barName: 'Legends',
            description: '$3 for any draft',
            barId: 5
        },
        {
            barName: 'Brothers',
            description: '$1 wells',
            barId: 4
        }
    ];

    specials = specials || tempSpecials;

    return (
        <FlatList
            data={specials}
            keyExtractor={(item, index) => item.barId}
            renderItem={({item}) => <SpecialRowComponent special={item}/>}
            />
    )

};

export default SpecialLayout;
