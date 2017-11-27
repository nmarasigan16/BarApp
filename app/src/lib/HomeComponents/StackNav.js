import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import DrawerNav from './DrawerNav';
import LoginPage from '../../containers/LoginPage/LoginPage';
import RegistrationPage from '../../containers/RegistrationPage/RegistrationPage';

const StackNav = StackNavigator({
    Home: {
        screen: DrawerNav,
        navigationOptions: {
            header: null,
        },
    },
    Login: {
        screen: LoginPage,
    },
    Register: {
        screen: RegistrationPage
    }
},
    {
        initialRouteName: 'Login',
        gesturesEnabled: false,
});

export default StackNav;
