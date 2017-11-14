import React, { Component } from 'react';
import {
    View,
    Dimensions,
    Button,
    TouchableOpacity,
} from 'react-native'
import { colorScheme } from "../../lib/ColorScheme";
import TextInput from 'react-native-material-textinput'
import Divider from '../general/divider/DividerComponent';
import TextComponent from '../general/text/TextComponent';
import FacebookLogin from './FacebookLogin';


class LoginForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
        };
        this.onLogin = this.onLogin.bind(this);
    }

    onLogin(e) {
        console.log(this.state.username);
    }

    render() {
        const { width, height } = Dimensions.get('window');
        const { username, password } = this.state;

        return (
            <View style={{
                alignSelf: 'center',
                flexDirection: 'column',
                width: 3 * width / 6,
                alignContent: 'center',
                opacity: this.props.opacity,
                marginTop: height / 30
            }}>
                <FacebookLogin/>
                <View style={{flexDirection: 'row', marginTop: height / 50}}>
                    <Divider style={{width: width / 6, alignSelf: 'center'}}/>
                    <View style={{width: width / 6, alignSelf: 'center'}}>
                        <TextComponent
                            style={{color: colorScheme.accent, textAlign: 'center'}}>
                            or
                        </TextComponent>
                    </View>
                    <Divider style={{width: width / 6, alignSelf: 'center'}}/>
                </View>
                <TextInput
                    color={'silver'}
                    label={'Username'}
                    labelColor={'silver'}
                    value={username}
                    onChangeText={(username) => this.setState({username})}
                />
                <TextInput
                    color={'silver'}
                    label={'Password'}
                    labelColor={'silver'}
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({password})}
                    value={password}
                />
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
                <TouchableOpacity>
                    <TextComponent
                        style={{
                            textAlign: 'center',
                            color: colorScheme.accent,
                            fontSize: width / 30,
                            marginTop: height / 50
                        }}>
                        new here? sign up!
                    </TextComponent>
                </TouchableOpacity>
            </View>
        )
    }
}

export default LoginForm;
