import React from 'react';
import {
    View,
    Dimensions,
} from 'react-native';
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/FontAwesome';
import Text from '../../general/text/TextComponent';
import { colorScheme } from "../../../lib/ColorScheme";

export const AdditionalInfoComponent = ({location, phone}) => {

    return (
        <View style={{flexDirection: 'column'}}>
            <View style={{flexDirection: 'row', justifyContent: 'center', alignContent:'center', margin: responsiveHeight(.5)}}>
                <Icon
                    name={'map-marker'}
                    size={20}
                    color={colorScheme.secondaryAccent}
                />
                <Text
                    style={{
                        color: colorScheme.secondaryAccent,
                        marginLeft: 5,
                        fontSize: responsiveFontSize(2)
                    }}>
                    Location
                </Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'center', alignContent:'center', margin: responsiveHeight(.5)}}>
                <Icon
                    name={'phone'}
                    size={20}
                    color={colorScheme.secondaryAccent}
                />
                <Text
                    style={{
                        color: colorScheme.secondaryAccent,
                        marginLeft: 5,
                        fontSize: responsiveFontSize(2)
                    }}>
                    Telepahone
                </Text>
            </View>
        </View>
    );
};

export default AdditionalInfoComponent;