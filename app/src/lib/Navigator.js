import React, { Component } from 'react';
import Profile from '../containers/BarProfile/BarProfileContainer';
import { TabNavigator } from 'react-navigation';

const Navigator = TabNavigator({
    Profile: {
        screen: Profile,
    },
},
    {
        tabBarPosition: 'bottom',
        animationEnabled: true,
        tabBarOptions: {
            activeTintColor: 'blue',
        },
});

export default Navigator;
