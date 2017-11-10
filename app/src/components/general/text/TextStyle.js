import {
    StyleSheet,
    Platform
} from 'react-native';

export const TextStyle = StyleSheet.create({
    text : {
        ...Platform.select({
           ios: { fontFamily: 'Courier New', },
           android: { fontFamily: 'monospace' }
        })
    },
});
