import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    TouchableOpacity
} from 'react-native';
import prompt from 'react-native-prompt-android';
import Text from '../general/text/TextComponent';
import Number from '../general/number/NumberComponent';
import { colorScheme } from "../../lib/styles/ColorScheme";


class CoverComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cover: this.props.cover,
        };

        this.handleCoverReport = this.handleCoverReport.bind(this);

    }

    handleCoverReport(e) {
        prompt(
            'Report Cover',
            'Please enter how much cover is here',
            [
                {text: 'Cancel', onPress: this.cancelPrompt, style: 'cancel'},
                {text: 'OK', onPress: this.confirmPrompt},
            ],
            {
                type: 'plain-text',
                cancelable: true,
                defaultValue: '',
                placeholder: 'placeholder'
            }
        );
    }

    cancelPrompt() {
        console.log('Cancelled');
    }

    confirmPrompt(cover) {
        console.log('Confirmed')
    }

    render() {
        return (
            <View style={{
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1
            }}>
                <Number
                    label={'Cover'}
                    number={`$${this.props.cover}`}
                    />
                <TouchableOpacity onPress={this.handleCoverReport}>
                    <Text
                        style={{
                            color: colorScheme.warn,
                            marginTop: 5
                        }}>
                        report
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default CoverComponent;
