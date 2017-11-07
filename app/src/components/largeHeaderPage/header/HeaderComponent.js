import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
} from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import Text from '../../text/TextComponent';

const HeaderComponent = ({name, username}) => {
    return (
        <View style={{flex:1.5, backgroundColor: '#24292e', justifyContent: 'center'}}>
            <Text style={{
                    textAlign: 'center',
                    fontSize: responsiveFontSize(4),
                    color: 'white'
            }}>
                {name}
            </Text>
            <Text style={{
                    textAlign: 'center',
                    fontSize: responsiveFontSize(2),
                    fontStyle: 'italic',
                    color: 'white'
            }}>
                {username}
            </Text>
        </View>
    );
};

HeaderComponent.propTypes = {
    name: PropTypes.string,
    username: PropTypes.string.isRequired
};

export default HeaderComponent;
