import React, { Component } from 'react';
import Specials from '../../containers/DailySpecials/DailySpecialsContainer';
import { DrawerNavigator } from 'react-navigation';

const DrawerNav = DrawerNavigator({
    Specials: {
        screen: Specials,
    },
},
    {
        drawerPosition: 'left',
});

export default DrawerNav;
