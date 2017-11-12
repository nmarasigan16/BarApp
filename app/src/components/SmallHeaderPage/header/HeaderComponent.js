import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Dimensions,
} from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import Text from '../../general/text/TextComponent';
import { colorScheme } from "../../../lib/ColorScheme";

const HeaderComponent = ({name='Legends'}) => {
    const { width, height } = Dimensions.get('window');

    return (
        <View style={{flex:1, minHeight: 2*height/20, backgroundColor: colorScheme.secondary, justifyContent: 'center'}}>
            <Text style={{
                textAlign: 'center',
                fontSize: responsiveFontSize(4),
                color: colorScheme.accent,
            }}>
                {name}
            </Text>
        </View>
    );
};

HeaderComponent.propTypes = {
    name: PropTypes.string,
    username: PropTypes.string.isRequired
};

export default HeaderComponent;
