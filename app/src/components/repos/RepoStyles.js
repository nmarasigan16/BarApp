import { StyleSheet } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

export const RepoStyles = StyleSheet.create({
    row: {
        marginTop: 5,
        alignSelf: 'center',
        height: responsiveHeight(10),
        width: responsiveWidth(90),
        overflow: 'hidden'
    },
    text: {
        marginLeft: responsiveWidth(.7),
        marginRight: responsiveWidth(.7),
        overflow: 'hidden'
    },
    name: {
        color: 'blue',
        top: responsiveHeight(.5),
        fontSize: responsiveFontSize(3),
        fontWeight: 'bold',
        marginBottom: responsiveHeight(.4),
    },
    owner: {
        fontSize: responsiveFontSize(1.5),
        fontStyle: 'italic',
    },
    description: {
        fontSize: responsiveFontSize(1.3),
    },
    divider: {
        alignSelf: 'center',
        width: responsiveWidth(90)
    }
});
