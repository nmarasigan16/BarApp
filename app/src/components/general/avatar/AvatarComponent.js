import React from 'react';
import {
    Image
} from 'react-native';

const AvatarComponent = ({image, size, style}) => {
    let width = 0;
    let height = 0;
    switch (size){
        case 'small': {
            width = 34;
            height = 34;
            break;
        }
        case 'medium': {
            width = 50;
            height = 50;
            break;
        }
        case 'large': {
            width = 75;
            height = 75;
            break;
        }
        case 'xlarge': {
            width = 150;
            height = 150;
            break;
        }
        default: {
            width = 34;
            height = 34;
        }
    }

    const avatarStyle = {
        borderRadius: width/2,
        width: width,
        height: height,
    };

    return (
        <Image
            source={{uri: image}}
            style={[avatarStyle, style]}
        />
    );
};

export default AvatarComponent;