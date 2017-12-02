import React, { Component } from 'react';
import {
    View,
    Dimensions,
    Button,
    TouchableOpacity,
} from 'react-native'
import { NavigationActions } from 'react-navigation';
import { colorScheme } from "../../lib/styles/ColorScheme";
import Text from '../../components/general/text/TextComponent';
import Form from '../../components/general/ValidatedTextInput/ValidatedForm';
import TextInput from '../../components/general/ValidatedTextInput/ValidatedTextInput';
import Dropdown from '../../components/general/ValidatedTextInput/ValidatedDropdown';
import { validators } from "../../lib/validators";

class RegistrationForm extends Component {
    constructor(props) {
        super(props);
        this.getData = this.getData.bind(this);
        this.returnToLogin = this.returnToLogin.bind(this);
    }

    getData() {
        const data = this.form.getData();
    }

    returnToLogin() {
        const back = NavigationActions.back();
        this.props.nav.dispatch(back);
    }

    render() {
        const { width, height } = Dimensions.get('window');
        const genders = [
            {value: 'Male'},
            {value: 'Female'},
            {value: 'Other/Prefer not to specify'},
        ];

        return (
            <View style={{
                marginLeft: width/15,
                marginRight: width/15,
                flexDirection: 'column',
            }}>
                <Form
                    ref={(form) => {this.form = form}}>
                    <TextInput
                        label={'Email'}
                        name={'username'}
                        validators={[validators.email, validators.isRequired]}
                        autoCapitalize={'none'}
                        />
                    <Dropdown
                        label={'Gender'}
                        name={'gender'}
                        data={genders}
                        validators={[validators.isRequired]}
                    />
                    <TextInput
                        label={'Age'}
                        name={'age'}
                        validators={[validators.minNumber(18), validators.isRequired]}/>
                    <TextInput
                        label={'Password'}
                        name={'password'}
                        validators={[validators.isRequired]}
                        secureTextEntry
                    />
                </Form>
                <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                    <TouchableOpacity onPress={this.returnToLogin}>
                        <Text
                            style={{
                                color: colorScheme.warn,
                                fontSize: width/20,
                                marginTop: 20,
                                marginRight: 20,
                            }}>
                            Cancel
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.getData}>
                        <Text
                            style={{
                                color: colorScheme.accent,
                                fontSize: width/20,
                                marginTop: 20,
                            }}>
                            Register
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )

    }
}

export default RegistrationForm;
