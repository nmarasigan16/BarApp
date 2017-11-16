import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    TouchableOpacity
} from 'react-native';
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';
import { phonecall } from 'react-native-communications';
import openMap from 'react-native-open-maps';
import Icon from 'react-native-vector-icons/FontAwesome';
import Text from '../../general/text/TextComponent';
import { colorScheme } from "../../../lib/styles/ColorScheme";

class AdditionalInfoComponent extends Component {
    constructor(props) {
        super(props);
    }

    onCall = (phoneNumber) => (e) => {
        phonecall(phoneNumber, true);
    };

    onNavigate = (location) => (e) => {
        openMap({latitude: location.latitude, longitude: location.longitude, provider: 'google'})
    };

    // source: https://stackoverflow.com/questions/8358084/regular-expression-to-reformat-a-us-phone-number-in-javascript
    formatPhoneNumber(s) {
        const s2 = (""+s).replace(/\D/g, '');
        const m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
        return (!m) ? null : "(" + m[1] + ") " + m[2] + "-" + m[3];
    }

    render() {
        const {
            location={},
            telephone=''
        } = this.props;
        let formattedPhone = '';
        if(telephone) {
            formattedPhone = this.formatPhoneNumber(telephone);
        }

        return (
            <View style={{flexDirection: 'column'}}>
                {location.hasOwnProperty('string_repr') ?
                <TouchableOpacity onPress={this.onNavigate(location)}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignContent: 'center',
                        margin: responsiveHeight(.5)
                    }}>
                     <Icon
                            name={'map-marker'}
                            size={20}
                            color={colorScheme.secondaryAccent}
                        />
                        <Text
                            style={{
                                color: colorScheme.secondaryAccent,
                                marginLeft: 5,
                                fontSize: responsiveFontSize(2),
                                alignSelf: 'center'
                            }}>
                            {location.string_repr}
                        </Text>
                    </View>
                </TouchableOpacity>: null}
                {telephone ?
                <TouchableOpacity onPress={this.onCall(telephone)}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignContent: 'center',
                        margin: responsiveHeight(.5)
                    }}>
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
                            {formattedPhone}
                        </Text>
                    </View>
                </TouchableOpacity> : null }
            </View>
        );
    }
};

export default AdditionalInfoComponent;