import React, { Component } from 'react';
import {
    View,
    Dimensions,
    Button,
    TouchableOpacity,
} from 'react-native'
import { colorScheme } from "../../lib/styles/ColorScheme";
import Divider from '../general/divider/DividerComponent';
import TextComponent from '../general/text/TextComponent';
import FacebookLogin from './FacebookLogin';
import LoginForm from '../../containers/Forms/LoginForm';


class LoginLayout extends Component {

    render() {
        const { width, height } = Dimensions.get('window');


        return(
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
                <LoginForm nav={this.props.nav}/>
                <TouchableOpacity onPress={(e) => {this.props.nav.navigate('Register')}}>
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

export default LoginLayout;
