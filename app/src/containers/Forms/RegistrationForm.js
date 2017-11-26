import React, { Component } from 'react';
import {
    View,
    Dimensions,
    Button,
    TouchableOpacity,
} from 'react-native'
import { colorScheme } from "../../lib/styles/ColorScheme";
import Form from '../../components/general/ValidatedTextInput/ValidatedTextForm';
import TextInput from '../../components/general/ValidatedTextInput/ValidatedTextInput';
import { validators } from "../../lib/validators";

class RegistrationForm extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { width, height } = Dimensions.get('window');

        return (
            <View style={{
                marginLeft: width/15,
                marginRight: width/15,
                flexDirection: 'column',
            }}>
                <Form>
                    <TextInput
                        label={'Email'}
                        name={'email'}
                        validators={[validators.email, validators.isRequired]}
                        autoCapitalize={'none'}
                        />
                </Form>
            </View>
        )

    }
}

export default RegistrationForm;
