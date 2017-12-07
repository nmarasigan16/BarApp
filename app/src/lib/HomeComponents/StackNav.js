import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import DrawerNav from './DrawerNav';
import LoginPage from '../../containers/LoginPage/LoginPage';
import RegistrationPage from '../../containers/RegistrationPage/RegistrationPage';
import BarcodePage from '../../containers/Barcode/BarcodeContainer';

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
    },
    Barcode: {
        screen: BarcodePage
    },
},
    {
        initialRouteName: 'Login',
        gesturesEnabled: false,
});

export default StackNav;
