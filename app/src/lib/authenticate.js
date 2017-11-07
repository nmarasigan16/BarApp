import {
    Linking
} from 'react-native';
import { makeUrl } from "../actions/apiActions";

const BASE_URL = 'ProfileApp://profile';
const CLIENT_ID = '96b9e610674e11455074';

export const authenticate = (navigate) => {
    let uri = 'https://github.com/login/oauth/authorize';
    uri = makeUrl(uri, {
        client_id: CLIENT_ID,
        scope: 'public_repo user:follow'
    });
    Linking.openURL(uri);
};

export const handleUrl = (url_string, getToken) => {
    const url = url_string.slice(BASE_URL.length);
    const code = url.slice(6);
    getToken(code);
}