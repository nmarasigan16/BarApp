import React, { Component } from 'react';
import {
    View,
    Dimensions,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import Page from '../../../../components/SmallHeaderPage/SmallHeaderPage';
import RailCardLayout from '../../../../components/BarProfile/Specials/RailCard/RailCardLayout';
import specialsActions from "../../../../actions/specialsActions";

class RailCardContainer extends Component {
    constructor(props) {
        super(props);
        this.navigationBarAction = this.navigationBarAction.bind(this);
        this.barcodeAction = this.barcodeAction.bind(this);
    }

    static navigationOptions = {
        header: null
    };

    componentWillMount() {
        this.props.specialsActions.onSpecial();
    }

    componentWillUnmount() {
        this.props.specialsActions.offSpecial();
    }

    navigationBarAction() {
        const { navigation } = this.props;
        const back = NavigationActions.back();
        navigation.dispatch(back);
    }


    barcodeAction() {
        const { navigation } = this.props;
        navigation.navigate('Barcode');
    }


    render() {
        const navigationBar = {
            navigate: this.navigationBarAction,
            name: 'chevron-left'
        };

        const barcode = {
            navigate: this.barcodeAction,
            name: 'barcode'
        };

        const { special } = this.props;

        const{ width, height } = Dimensions.get('window');

        return (
            <Page
                nav={navigationBar}
                barcode={barcode}
                name={`Your ${special.specialName}`}>
                <RailCardLayout rows={special.rows}/>
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
        special: state.specials.special
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RailCardContainer);

