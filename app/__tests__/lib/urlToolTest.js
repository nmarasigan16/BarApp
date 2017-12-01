import 'react-native';
import React from 'react';
import { makeUrl, parseUrl } from "../../src/lib/url/urlTools";

it('should make a correct url with params', () => {
    const expectedUrl = 'https://moo.com/cow?color=brown&gender=male';
    const params = {
        color: 'brown',
        gender: 'male',
    };
    uri = 'https://moo.com/cow';
    expect(makeUrl(uri, params)).toEqual(expectedUrl);
});

it('correctly parses a url with multiple params', () => {
    const expectedObj = {
        url: 'https://moo.com/cow',
        params: {
            color: 'brown',
            gender: 'male',
        }
    };
    const url = 'https://moo.com/cow?color=brown&gender=male';
    expect(parseUrl(url)).toEqual(expectedObj);
});

it('correctly parses a url with one param', () => {
    const expectedObj = {
        url: 'https://moo.com/cow',
        params : {
            color: 'brown'
        }
    };
    const url = 'https://moo.com/cow?color=brown';
    expect(parseUrl(url)).toEqual(expectedObj);
});

it('correctly parses a url with no params', () => {
    const expectedObj = {
        url: 'https://moo.com/cow',
        params: {
        }
    };
    const url = 'https://moo.com/cow';
    expect(parseUrl(url)).toEqual(expectedObj);
});
