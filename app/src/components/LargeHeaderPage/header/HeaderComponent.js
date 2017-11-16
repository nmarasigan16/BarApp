import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Dimensions,
} from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import Text from '../../general/text/TextComponent';
import AdditionalInfo from './AdditionalInfoComponent';
import { colorScheme } from "../../../lib/styles/ColorScheme";

const HeaderComponent = ({name, telephone, location}) => {
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
            {telephone || location ? <AdditionalInfo location={location} telephone={telephone}/> : null}
        </View>
    );
};

HeaderComponent.propTypes = {
    name: PropTypes.string.isRequired,
    telephone: PropTypes.string,
    location: PropTypes.shape({
        string_repr: PropTypes.string,
        latitude: PropTypes.number,
        longitude: PropTypes.number
    }),
};

export default HeaderComponent;
