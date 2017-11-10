import React from 'react';
import {
    Text
} from 'react-native';
import { TextStyle as styles } from './TextStyle';

export const TextComponent = (props) => {
    return (
        <Text style={[styles.text, props.style]}>
            {props.children}
        </Text>
    )
};

export default TextComponent
