import React, { Component } from 'react';
import {
    View,
    StatusBar,
    Platform
} from 'react-native';
import Navigator from './Navigator';
import { colorScheme } from "../styles/ColorScheme";
import LoginPage from '../../containers/LoginPage/LoginPage';
import LoginForm from "../../containers/Forms/LoginForm";
import NavigationBar from "../../components/NavigationBar/NavigationBarComponent";


class HomePage extends Component {
    constructor(props){
        super(props);
    }

    render() {
        let height = Platform.OS === 'ios' ? 20 : StatusBar.height;
        return (
            <View style={{flex: 1, backgroundColor: colorScheme.secondary}}>
                <StatusBar
                    barStyle={'light-content'}/>
                <View style={{height, backgroundColor: colorScheme.secondary}} />
                <LoginPage/>
            </View>
        )
    }
}

export default HomePage;