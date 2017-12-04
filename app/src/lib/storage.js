import { AsyncStorage } from 'react-native';

export const keys = {
    TOKEN: 'token',
    REPO_KEY: 'repositories',
    FOLLOWER_KEY: 'followers',
    FOLLOWING_KEY: 'following',
    PROFILE_KEY: 'profile',
};

export function storeItem(key, value){
    if(typeof value != null)
        AsyncStorage.setItem(key, JSON.stringify(value));
}

export function getItem(key){
    AsyncStorage.getItem(key)
        .then(
            retVal => {
                return JSON.parse(retVal);
            })
        .catch(
            () => {
                return '';
            }
        )
}
