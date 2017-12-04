import React, { Component } from 'react';
import {
    View,
    StatusBar,
    Platform
} from 'react-native';
import Navigator from './StackNav';
import DrawerNav from './DrawerNav';
import { colorScheme } from "../styles/ColorScheme";


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
                <Navigator/>
            </View>
        )
    }
}

export default HomePage;