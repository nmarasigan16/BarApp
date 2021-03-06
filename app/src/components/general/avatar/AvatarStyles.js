import { StyleSheet } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

export const AvatarStyles = StyleSheet.create({
    row: {
        marginTop: 5,
        alignSelf: 'center',
        width: responsiveWidth(90),
        height: responsiveHeight(10),
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    text: {
        overflow: 'hidden'
    },
    name: {
        fontSize: responsiveFontSize(3),
        color: 'black',
        marginLeft: responsiveWidth(5),
    },
    avatar: {
        alignSelf: 'flex-start'
    }
});