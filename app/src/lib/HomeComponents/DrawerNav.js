import React, { Component } from 'react';
import Specials from '../../containers/DailySpecials/DailySpecialsContainer';
import { DrawerNavigator } from 'react-navigation';
import BarcodeScanner from "../../containers/Barcode/BarcodeScanner";

const DrawerNav = DrawerNavigator({
    Specials: {
        screen: Specials,
    },
    Scanner: {
        screen: BarcodeScanner
    }
},
    {
        drawerPosition: 'left',
});

export default DrawerNav;
