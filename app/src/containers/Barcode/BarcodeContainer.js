import React, { Component } from 'react';
import {
    View,
    Dimensions,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import QRCode from 'react-native-qrcode';
import Page from '../../components/SmallHeaderPage/SmallHeaderPage';

class BarcodeContainer extends Component {
    constructor(props) {
        super(props);
        this.navigationBarAction = this.navigationBarAction.bind(this);

        this.state = {
            onSpecial: this.props.onSpecial,
        };
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

        const { special, bar, onSpecial } = this.props;

        const data = onSpecial ? {
            bar: bar.id,
            special: special.id
        } : {
            bar: bar.id
        };


        const{ width, height } = Dimensions.get('window');

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
                            value={data}
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

function mapDispatchToProps(dispatch) {
    return {
        specialsActions: bindActionCreators(specialsActions, dispatch),
    };
}

function mapStateToProps(state) {
    return {
        bar: state.bar.bar,
        special: state.specials.special,
        onSpecial: state.specials.onSpecial,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BarcodeContainer);
