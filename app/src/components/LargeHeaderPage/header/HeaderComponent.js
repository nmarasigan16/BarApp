import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Dimensions,
} from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import Text from '../../general/text/TextComponent';
import AdditionalInfo from './AdditionalInfoComponent';
import { colorScheme } from "../../../lib/ColorScheme";

const HeaderComponent = ({name='Legends'}) => {
    const { width, height } = Dimensions.get('window');

    return (
        <View style={{flex:1, minHeight: height/4, backgroundColor: colorScheme.secondary, justifyContent: 'center'}}>
            <Text style={{
                    textAlign: 'center',
                    fontSize: responsiveFontSize(6),
                    color: colorScheme.accent,
                    marginBottom: 10
            }}>
                {name}
            </Text>
            <AdditionalInfo/>
        </View>
    );
};

HeaderComponent.propTypes = {
    name: PropTypes.string,
    username: PropTypes.string.isRequired
};

export default HeaderComponent;
