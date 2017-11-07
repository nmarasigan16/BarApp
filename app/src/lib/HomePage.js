import React, { Component } from 'react';
import {
    View,
    StatusBar,
    Platform
} from 'react-native';
import Navigator from './Navigator';
import HomeButton from '../containers/home_button/HomeButtonComponent';


class HomePage extends Component {
    constructor(props){
        super(props);
    }

    render() {
        let height = 0;
        if(Platform.OS !== 'ios') {
            height = StatusBar.currentHeight;
        }
        return (
            <View style={{flex: 1, backgroundColor: 'darkslategrey'}}>
                <StatusBar
                    barStyle={'light-content'}
                />
                <View style={{height:15}} />
                <HomeButton />
                <Navigator />
            </View>
        )
    }
}

export default HomePage;