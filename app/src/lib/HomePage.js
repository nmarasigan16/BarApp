import React, { Component } from 'react';
import {
    View,
    StatusBar,
    Platform
} from 'react-native';
import Navigator from './Navigator';
import { colorScheme } from "./ColorScheme";
import LoginPage from '../components/LoginPage/LoginPageComponent';


class HomePage extends Component {
    constructor(props){
        super(props);
    }

    render() {
        let height = Platform.OS === 'ios' ? 20 : StatusBar.height;
        return (
            <View style={{flex: 1, backgroundColor: colorScheme.primary}}>
                <StatusBar
                    barStyle={'light-content'}/>
                <View style={{height, backgroundColor: colorScheme.secondary}} />
                <LoginPage />
            </View>
        )
    }
}

export default HomePage;