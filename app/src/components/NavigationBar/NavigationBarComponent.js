import React, { Component } from 'react';
import {
    View,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Text from '../general/text/TextComponent';
import { colorScheme } from "../../lib/styles/ColorScheme";
import { LogoStyle } from "../../lib/styles/LogoStyle";

const NavigationBar = ({nav, barcode}) => {

    const showNav = typeof(nav) !== 'undefined';
    const showBarcode = typeof(barcode) !== 'undefined';

    const { width, height } = Dimensions.get('window');

    return (
        <View style={{height: height/20, flexDirection: 'row', backgroundColor: colorScheme.secondary}}>
            <View style={{width: width/4, justifyContent: 'center', alignContent: 'center'}}>
                {showNav ?
                    <TouchableOpacity onPress={() => {nav.navigate()}}>
                        <Icon
                            name={nav.name}
                            size={height/30}
                            color={colorScheme.accent}
                            style={{marginLeft: width/50}}
                            />
                    </TouchableOpacity> : null}
            </View>
            <View style={{width: 2*width/4, flexDirection: 'column', justifyContent: 'center'}}>
                <Text style={[{
                    textAlign: 'center',
                    fontSize: height/24,
                }, LogoStyle.logo]}>
                    BarCode
                </Text>
            </View>
            <View style={{width: width/4, justifyContent: 'center', alignItems: 'flex-end'}}>
                {showBarcode ?
                    <TouchableOpacity onPress={() => {barcode.navigate()}}>
                        <Icon
                            name={barcode.name}
                            size={height/30}
                            color={colorScheme.accent}
                            style={{marginRight: width/50}}
                            />
                    </TouchableOpacity> : null}
            </View>
        </View>
    )

};

export default NavigationBar;