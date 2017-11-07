import React from 'react';
import {
    TouchableOpacity,
    View,
} from 'react-native';
import Text from '../text/TextComponent';
import Divider from '../divider/DividerComponent';
import Avatar from '../avatar/AvatarComponent';
import { FollowStyles as styles } from "./FollowStyles";

const FollowRowComponent = ({name, image, onClick}) => {
    if(name && typeof onClick == 'function') {
        return (
            <View>
                <TouchableOpacity
                    onPress={() => {onClick(name)}}>
                    <View style={styles.row}>
                        {image ?
                            <Avatar
                                image={image}
                                size={'medium'}
                                style={styles.avatar}/> : null}
                        <Text style={styles.name}>
                            {name}
                        </Text>
                    </View>
                </TouchableOpacity>
                <Divider style={styles.divider}/>
            </View>: null
            );
    }
    return null;
};

export default FollowRowComponent
