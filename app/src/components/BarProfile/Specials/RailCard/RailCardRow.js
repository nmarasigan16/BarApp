import React, { Component } from 'react';
import {
    View,
    Dimensions,
    Image,
    Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colorScheme } from "../../../../lib/styles/ColorScheme";
import Text from '../../../general/text/TextComponent';

const stampOptions = [
    'rocket',
    'space-shuttle',
    'heart',
    'anchor',
    'birthday-cake',
    'money',
    'snowflake-o',
    'soccer-ball-o',
    'smile-o',
    'star',
    'beer',
    'glass',
];

class RailCardRow extends Component {
    constructor(props) {
        super(props);

        this.state = {
            stamps: 0,
            amount: props.row.amount,
        };

    }

    stampIcon() {
        return stampOptions[Math.floor(Math.random() * stampOptions.length)];
    }

    render() {
        const {width, height} = Dimensions.get('window');
        const { row } = this.props;
        let stamps = this.state.amount;

        const image = Platform.OS === 'ios' ? row.beerName : `asset:/${row.beerName}.png`;

        return (
            <View style={{
                backgroundColor: 'white',
                flexDirection: 'row',
                justifyContent: 'center',
                marginLeft: width / 10,
                marginRight: width / 10,
                height: height / 12,
            }}>
                <View style={{
                    width: width / 5,
                    borderWidth: 0.5,
                    borderColor: 'black',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Image
                        style={{
                            width: width / 6,
                            height: height / 13
                        }}
                        source={{uri: image}}
                    />
                </View>
                <View style={{
                    width: width / 5,
                    borderWidth: 0.5,
                    borderColor: 'black',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    {stamps-- > 0 ?
                        <Icon
                            name={this.stampIcon()}
                            size={height/32}/> : null}
                </View>
                <View style={{
                    width: width / 5,
                    borderWidth: 0.5,
                    borderColor: 'black',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    {stamps-- > 0 ?
                        <Icon
                            name={this.stampIcon()}
                            size={height/32}/> : null}
                </View>
                <View style={{
                    width: width / 5,
                    borderWidth: 0.5,
                    borderColor: 'black',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    {stamps-- > 0 ?
                        <Icon
                            name={this.stampIcon()}
                            size={height/32}/> : null}
                </View>
            </View>
        )
    }
};

export default RailCardRow;