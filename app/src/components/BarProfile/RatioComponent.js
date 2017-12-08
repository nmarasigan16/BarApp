import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Text from '../general/text/TextComponent';
import Number from '../general/number/NumberComponent';
import { colorScheme } from "../../lib/styles/ColorScheme";
import { responsiveFontSize } from 'react-native-responsive-dimensions';


const RatioComponent = ({guys}) => {

    return (
        <View style={{
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1
        }}>
            <Text
                style={{
                    marginBottom: 10,
                    fontSize: responsiveFontSize(2),
                    color: colorScheme.accent,
                }}>
                Ratio
            </Text>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Text
                        style={{
                            color: 'deepskyblue',
                            fontSize: responsiveFontSize(3)
                        }}>
                        {guys}%
                    </Text>
                    <Icon
                        name={'mars'}
                        color={'deepskyblue'}
                        size={responsiveFontSize(2)}
                    />
                </View>
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Text
                        style={{
                            color: 'deeppink',
                            fontSize: responsiveFontSize(3)
                        }}>
                        {100-guys}%
                    </Text>
                    <Icon
                        name={'venus'}
                        color={'deeppink'}
                        size={responsiveFontSize(2)}
                    />
                </View>
            </View>
        </View>
    )
};

export default RatioComponent;
