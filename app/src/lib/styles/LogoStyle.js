import { StyleSheet } from 'react-native';
import { colorScheme } from "./ColorScheme";

export const LogoStyle = StyleSheet.create({
    logo : {
        color: colorScheme.logoColor,
        textShadowColor: 'rgba(255, 255, 255, 1.0)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 8,
    }
});