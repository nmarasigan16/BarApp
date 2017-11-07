import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Image,
    Dimensions
} from 'react-native';

const AvatarComponent = ({image, height, width}) => {
    const responsiveHeight = (num) => {
        return height*(num/100.0);
    };
    const responsiveWidth = (num) => {
        return width*(num/100.0);
    };

    let avatarDimensions = responsiveHeight(30) < responsiveWidth(30) ?
                            responsiveHeight(30) : responsiveWidth(30);

    const styles = {
        avatar: {
            height: avatarDimensions,
            width: avatarDimensions,
            borderRadius: 10,
            alignSelf: 'center',
            top: -avatarDimensions/2
        },
        top: {
            backgroundColor: '#24292e',
            height: avatarDimensions/2
        },
        container: {
            backgroundColor: 'white',
            maxHeight: avatarDimensions
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.top} />
            <Image
                style={styles.avatar}
                source={{uri: image}}
            />
        </View>
    );
};

AvatarComponent.propTypes = {
};

export default AvatarComponent;
