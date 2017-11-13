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

const PageComponent = ({nav, name, telephone, location, children}) => {

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
                <Header name={name} telephone={telephone} location={location}/>
                <Body content={children} />
            </ScrollView>
        </View>
    );
};

PageComponent.propTypes = {
    name: PropTypes.string.isRequired,
    children: PropTypes.any,
    telephone: PropTypes.any,
    location: PropTypes.any
};

export default PageComponent;
