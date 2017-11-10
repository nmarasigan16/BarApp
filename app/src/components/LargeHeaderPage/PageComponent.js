import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    ScrollView,
    StatusBar,
    Platform
} from 'react-native';
import Body from './body/BodyComponent';
import Header from './header/HeaderComponent';
import Nav from '../NavigationBar/NavigationBarComponent';

const PageComponent = ({name, children}) => {

    const styles = {
        container : {
            flex: 1,
            flexDirection: 'column',
        }
    };


    return (
        <View style={{flex: 1}}>
            <Nav />
            <ScrollView>
                <Header name={name} />
                <Body content={children} />
            </ScrollView>
        </View>
    );
};

PageComponent.propTypes = {
};

export default PageComponent;
