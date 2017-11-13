import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    ScrollView,
    StatusBar,
    Platform
} from 'react-native';
import Header from './header/HeaderComponent';
import Body from './body/BodyComponent';
import Nav from '../NavigationBar/NavigationBarComponent';

const SmallHeaderPage = ({nav, name, children}) => {

    const styles = {
        container : {
            flex: 1,
            flexDirection: 'column',
        }
    };


    return (
        <View style={{flex: 1}}>
            <Nav nav={nav}/>
            <ScrollView>
                <Header name={name} />
                <Body content={children} />
            </ScrollView>
        </View>
    );
};


export default SmallHeaderPage;
