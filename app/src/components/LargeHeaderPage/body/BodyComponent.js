import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Dimensions,
} from 'react-native';
import { colorScheme } from "../../../lib/ColorScheme";

const BodyComponent = ({content}) => {
    const { width, height } = Dimensions.get('window');

    return (
        <View style={{flex:3, minHeight: 3*height/4,backgroundColor:colorScheme.primary}}>
            {content}
        </View>
    );
};

BodyComponent.propTypes = {
};

export default BodyComponent;