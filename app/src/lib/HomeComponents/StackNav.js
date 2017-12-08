import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import DrawerNav from './DrawerNav';
import LoginPage from '../../containers/LoginPage/LoginPage';
import RegistrationPage from '../../containers/RegistrationPage/RegistrationPage';
import BarcodePage from '../../containers/Barcode/BarcodeContainer';
import RailCardPage from '../../containers/BarProfile/Specials/RailCard/RailCardContainer';
import BarPage from '../../containers/BarProfile/BarProfileContainer';

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
    RailCard: {
        screen: RailCardPage
    },
    Bar: {
        screen: BarPage
    },
},
    {
        initialRouteName: 'Login',
        gesturesEnabled: false,
});

export default StackNav;
