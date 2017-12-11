import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Camera from 'react-native-camera';
import Page from '../../components/SmallHeaderPage/SmallHeaderPage';
import { colorScheme } from "../../lib/styles/ColorScheme";

class BarcodeScanner extends Component {
    constructor(props) {
        super(props);
        this.navigationBarAction = this.navigationBarAction.bind(this);
    }

    static navigationOptions = {
        drawerLabel: 'Barcode Scanner',
        drawerIcon: () => (
            <Icon
                name={'barcode'}
                color={colorScheme.secondary}
            />
        ),
    };

    navigationBarAction() {
        const { navigation } = this.props;
        navigation.navigate('DrawerOpen')
    }

    render() {
        const navigationBar = {
            navigate: this.navigationBarAction,
            name: 'bars'
        };

        return (
            <Page nav={navigationBar} name={'Barcode Scanner'}>
                <Camera
                    ref={(cam) => {
                        this.camera = cam;
                    }}
                    onBarCodeRead={this.onBarCodeRead.bind(this)}
                    style={styles.preview}
                    aspect={Camera.constants.Aspect.fill}>
                    <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
                </Camera>
            </Page>
        );
    }

    onBarCodeRead(e) {
        console.log(
            "Barcode Found!",
            "Type: " + e.type + "\nData: " + e.data
        );
    }

    takePicture() {
        const options = {};
        //options.location = ...
        this.camera.capture({metadata: options})
            .then((data) => console.log(data))
            .catch(err => console.error(err));
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        color: '#000',
        padding: 10,
        margin: 40
    }
});

export default BarcodeScanner;
