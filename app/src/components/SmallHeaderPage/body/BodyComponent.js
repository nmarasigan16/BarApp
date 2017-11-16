import React from 'react';
import {
    View,
    Dimensions,
} from 'react-native';
import { colorScheme } from "../../../lib/styles/ColorScheme";

const BodyComponent = ({content}) => {
    const { width, height } = Dimensions.get('window');

    return (
        <View style={{flex:3, minHeight: 17*height/20,backgroundColor:colorScheme.primary}}>
            {content}
        </View>
    );
};

export default BodyComponent;
