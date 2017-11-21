import React, { Component } from 'react';
import {
    View,
    Dimensions,
    TouchableOpacity,
} from 'react-native'
import { colorScheme } from "../../lib/styles/ColorScheme";
import ValidatedTextInput from "../../components/general/ValidatedTextInput/ValidatedTextInput";
import { validators } from "../../lib/validators";
import TextComponent from '../../components/general/text/TextComponent';
import Form from '../../components/general/ValidatedTextInput/ValidatedTextForm';


class LoginForm extends Component {
    constructor(props){
        super(props);
        this.onLogin = this.onLogin.bind(this);
    }

    onLogin() {
        console.log(this.form.setData());
    }

    render() {
        const { width, height } = Dimensions.get('window');

        return (
            <View>
                <Form ref={(form) => {this.form = form;}}>
                    <ValidatedTextInput
                        ref={(username) => {this.username = username;}}
                        name={'username'}
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
                        name={'password'}
                        label={'Password'}
                        labelColor={colorScheme.accent}
                        secureTextEntry={true}
                        onChangeText={(password) => this.setState({password})}
                        value={password}
                    />
                </Form>
                <TouchableOpacity onPress={this.onLogin}>
                    <TextComponent
                        style={{
                            textAlign: 'center',
                            color: colorScheme.accent,
                            fontSize: width / 20,
                            marginTop: height / 30
                        }}>
                        login
                    </TextComponent>
                </TouchableOpacity>
            </View>
        );
    }
}

export default LoginForm;
