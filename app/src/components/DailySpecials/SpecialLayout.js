import React from 'react';
import PropTypes from 'prop-types';
import {
    FlatList,
} from 'react-native';
import SpecialRowComponent from "./SpecialRowComponent";

const SpecialLayout = ({specials, onPress}) => {
    const tempSpecials = [
        {
            barName: 'Legends',
            description: '$3 for any draft',
            barId: 5
        },
        {
            barName: 'Brothers',
            description: '$1 wells',
            barId: 4
        }
    ];

    specials = specials || tempSpecials;

    return (
        <FlatList
            data={specials}
            keyExtractor={(item, index) => item.barId}
            renderItem={({item}) => <SpecialRowComponent special={item} onPress={onPress}/>}
            />
    )

};

SpecialLayout.propTypes = {
    specials: PropTypes.array
};

export default SpecialLayout;
