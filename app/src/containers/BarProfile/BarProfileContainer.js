import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import specialsActions from '../../actions/specialsActions';
import Page from '../../components/LargeHeaderPage/PageComponent';
import BarProfileLayout from '../../components/BarProfile/BarProfileLayout';
import { NavigationActions } from 'react-navigation';


class BarProfileContainer extends Component {
    constructor(props) {
        super(props);
        this.navigationBarAction = this.navigationBarAction.bind(this);
        this.barcodeAction = this.barcodeAction.bind(this);
        this.onSpecialPress = this.onSpecialPress.bind(this);
    }

    static navigationOptions = {
        header: null,
    };

    navigationBarAction() {
        const { navigation } = this.props;
        const back = NavigationActions.back();
        navigation.dispatch(back);
    }

    barcodeAction() {
        const { navigation } = this.props;
        navigation.navigate('Barcode');
    }

    onSpecialPress = (specialId) => () => {
        const { specialsActions, bar, navigation } = this.props;
        //specialsActions.getSpecial(bar.id, specialId);
        navigation.navigate('RailCard');
    };

    render() {
        const navigationBar = {
            navigate: this.navigationBarAction,
            name: 'chevron-left'
        };

        const barcode = {
            navigate: this.barcodeAction,
            name: 'barcode'
        };

        return (
            <Page
                nav={navigationBar}
                name={this.props.bar.name}
                telephone={this.props.bar.phone}
                barcode={barcode}
                >
                <BarProfileLayout bar={this.props.bar} onSpecialPress={this.onSpecialPress}/>
            </Page>
        )
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
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BarProfileContainer);
