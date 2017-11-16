import React, { Component } from 'react';
import {
    View,
    Dimensions,
} from 'react-native'
import { colorScheme } from "../../lib/styles/ColorScheme";
import ValidatedTextInput from "../general/ValidatedTextInput/ValidatedTextInput";
import { validators } from "../../lib/validators";


class LoginForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
        };
    }

    render() {
        const { width, height } = Dimensions.get('window');
        const { username, password } = this.state;

        return (
            <View>
                <ValidatedTextInput
                    color={colorScheme.accent}
                    label={'Username'}
                    labelColor={colorScheme.accent}
                    value={username}
                    autoCapitalize = {'none'}
                    onChangeText={(username) => this.setState({username})}
                    validators={[validators.email]}
                    errorMessage={'hello'}
                />
                <ValidatedTextInput
                    color={colorScheme.accent}
                    label={'Password'}
                    labelColor={colorScheme.accent}
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({password})}
                    value={password}
                />
            </View>
        )
    }
}

export default LoginForm;
