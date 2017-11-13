import React from 'react';
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


const LoginForm = (props) => {
    const {width, height} = Dimensions.get('window');

    return (
        <View style={{alignSelf: 'center', flexDirection: 'column', width: 3*width/6, alignContent: 'center', opacity: props.opacity, marginTop: height/30}}>
            <FacebookLogin/>
            <View style={{flexDirection: 'row', marginTop: height/50}}>
                <Divider style={{width: width/6, alignSelf: 'center'}} />
                <View style={{width: width/6, alignSelf: 'center'}}>
                    <TextComponent
                        style={{color: colorScheme.accent, textAlign: 'center'}}>
                        or
                    </TextComponent>
                </View>
                <Divider style={{width: width/6, alignSelf:'center'}}/>
            </View>
            <TextInput
                color={'silver'}
                label={'Username'}
                labelColor={'silver'}
            />
            <TextInput
                color={'silver'}
                label={'Password'}
                labelColor={'silver'}
                secureTextEntry={true}
            />
            <TouchableOpacity>
                <TextComponent
                    style={{
                        textAlign: 'center',
                        color: colorScheme.accent,
                        fontSize: width/20,
                        margin: height/30
                    }}>
                    login
                </TextComponent>
            </TouchableOpacity>
        </View>
    )
};

export default LoginForm;
