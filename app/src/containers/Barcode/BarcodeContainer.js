import React, { Component } from 'react';
import {
    View,
    Dimensions,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import QRCode from 'react-native-qrcode';
import Page from '../../components/SmallHeaderPage/SmallHeaderPage';

class BarcodeContainer extends Component {
    constructor(props) {
        super(props);
        this.navigationBarAction = this.navigationBarAction.bind(this);
    }

    static navigationOptions = {
        header: null
    };

    navigationBarAction() {
        const { navigation } = this.props;
        const back = NavigationActions.back();
        navigation.dispatch(back);
    }


    render() {
        const navigationBar = {
            navigate: this.navigationBarAction,
            name: 'chevron-left'
        };

        const{ width, height } = Dimensions.get('window');
        const x = {
            user: 'egarsenal16',
            specialId: '5',
        };
        const y = JSON.stringify(x);

        return (
            <Page
                nav={navigationBar}
                name={'Your BarCode'}>
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                }}>
                    <View style={{
                        marginTop: height/8
                    }}>
                        <QRCode
                            value={y}
                            size={width < height ? width/2 : height/2}
                            bgColor='black'
                            fgColor='white'
                        />
                    </View>
                </View>
            </Page>
        );
    }
}

export default BarcodeContainer;