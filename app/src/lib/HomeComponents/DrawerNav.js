import React, { Component } from 'react';
import Specials from '../../containers/DailySpecials/DailySpecialsContainer';
import Bar from '../../containers/BarProfile/BarProfileContainer';
import { DrawerNavigator } from 'react-navigation';

const DrawerNav = DrawerNavigator({
    Specials: {
        screen: Specials,
    },
    Bar: {
        screen: Bar,
    },
},
    {
        drawerPosition: 'left',
});

export default DrawerNav;
