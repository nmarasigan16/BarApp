import { AsyncStorage } from 'react-native';

const keys = {
    REPO_KEY: 'repositories',
    FOLLOWER_KEY: 'followers',
    FOLLOWING_KEY: 'following',
    PROFILE_KEY: 'profile',
};

export function storeItem(key, value){
    if(typeof value != null)
        AsyncStorage.setItem(keys[key], JSON.stringify(value));
}

export function getItem(key, value){
    AsyncStorage.getItem(keys[key]).then(
        retVal => {
            return JSON.parse(retVal);
        });
}
