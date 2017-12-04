import React, { Component } from 'react';
import {
    View,
    FlatList,
} from 'react-native';
import CoverComponent from './CoverComponent';
import RatioComponent from './RatioComponent';
import SpecialRowComponent from "./SpecialRowComponent";
import Text from '../general/text/TextComponent';
import {colorScheme} from "../../lib/styles/ColorScheme";



const BarProfileLayout = ({bar}) => {
    // TODO link up with api
    const specials = [
        {
            id: 1,
            description: '$3 drafts.  Includes Legend\'s Lager, Guinness, Blue Moon, Coors Light, Miller Lite, and more!',
            object: {
                name: 'Rail Card'
            }
        },
        {
            id: 2,
            description: '$2 Tequila shots'
        }
    ];
    return (
        <View>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <CoverComponent cover={10}/>
                <RatioComponent guys={50}/>
            </View>
            <View
                style={{
                    flexDirection: 'column',
                    marginTop: 20,
                    margin: 10
                }}>
                <Text
                    style={{
                        alignSelf: 'center',
                        textAlign: 'center',
                        color: colorScheme.accent,
                        fontWeight: 'bold'
                    }}>
                    Specials
                </Text>
                <FlatList
                    data={specials}
                    keyExtractor={(item) => {
                        return item.id;
                    }}
                    renderItem={({item}) => <SpecialRowComponent special={item}/>}
                />
            </View>
        </View>
    )
};

export default BarProfileLayout;