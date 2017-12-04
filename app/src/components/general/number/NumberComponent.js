import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import Text from '../text/TextComponent';
import { colorScheme } from "../../../lib/styles/ColorScheme";

const NumberComponent = ({label, number, color}) => {
    color = color || colorScheme.accent;
    return (
        <View style={{
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Text style={{
                textAlign: 'center',
                fontSize: responsiveFontSize(2),
                color: color,
                margin: 10
            }}>
                {label}
            </Text>
            <Text style={{
                textAlign: 'center',
                color: color,
                fontSize: responsiveFontSize(3),
                fontWeight: 'bold'
            }}>
                {number}
            </Text>
        </View>
    );
};

export default NumberComponent;
