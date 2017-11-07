import { StyleSheet } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

export const RepoStyles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        marginTop: 5,
        alignSelf: 'center',
        height: responsiveHeight(10),
        width: responsiveWidth(90),
        justifyContent: 'space-between',
    },
    text: {
        overflow: 'hidden',
        flex: 3,
        width: responsiveWidth(75),
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
