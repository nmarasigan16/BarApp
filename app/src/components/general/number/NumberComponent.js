import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import Text from '../text/TextComponent';

const NumberComponent = ({label, number}) => {
    return (
        <View style={{
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Text style={{
                textAlign: 'center',
                fontSize: responsiveFontSize(2),
                margin: 10
            }}>
                {label}
            </Text>
            <Text style={{
                textAlign: 'center',
                fontSize: responsiveFontSize(3),
                fontWeight: 'bold'
            }}>
                {number}
            </Text>
        </View>
    );
};

export default NumberComponent;
