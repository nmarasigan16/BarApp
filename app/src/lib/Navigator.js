import React, { Component } from 'react';
import Specials from '../containers/DailySpecials/DailySpecialsContainer';
import Bar from '../containers/BarProfile/BarProfileContainer';
import { DrawerNavigator } from 'react-navigation';

const Navigator = DrawerNavigator({
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

export default Navigator;
