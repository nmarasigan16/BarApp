import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    ScrollView,
} from 'react-native';
import { responsiveWidth } from 'react-native-responsive-dimensions';

const BodyComponent = ({content}) => {
    return (
        <View style={{flex:3, backgroundColor:'white'}}>
            {content}
        </View>
    );
};

BodyComponent.propTypes = {
};

export default BodyComponent;
