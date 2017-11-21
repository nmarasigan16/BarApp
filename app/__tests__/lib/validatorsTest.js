/* eslint-disable no-undef */
import 'react-native';
import React from 'react';
import { validators } from "../../src/lib/validators";

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

describe('validators', () => {
    describe('numberRange', () => {
        it('is a number', () => {
            const tester = validators.numberRange(0, 1);
            expect(tester('a')).toEqual({
                valid: false,
                errorMessage: expect.any(String)
            });
        });

        it('is in range', () => {
            const tester = validators.numberRange(0, 5);
            expect(tester('3')).toEqual({
                valid: true,
                errorMessage: expect.any(String)
            });
        });

        it('is out of range', () => {
            const tester = validators.numberRange(0, 5);
            expect(tester('8')).toEqual({
                valid: false,
                errorMessage: expect.any(String)
            });
        })
    });

    describe('minNumber', () => {
        it('is a number', () => {
            const tester = validators.minNumber(1);
            expect(tester('a')).toEqual({
                valid: false,
                errorMessage: expect.any(String)
            });
        });

        it('is more than number', () => {
            const tester = validators.minNumber(1);
            expect(tester('3')).toEqual({
                valid: true,
                errorMessage: expect.any(String)
            });
        });

        it('is less than number', () => {
            const tester = validators.minNumber(1);
            expect(tester('0')).toEqual({
                valid: false,
                errorMessage: expect.any(String)
            });
        })
    });

    describe('maxNumber', () => {
        it('is a number', () => {
            const tester = validators.maxNumber(1);
            expect(tester('a')).toEqual({
                valid: false,
                errorMessage: expect.any(String)
            });
        });

        it('is more than number', () => {
            const tester = validators.maxNumber(1);
            expect(tester('3')).toEqual({
                valid: false,
                errorMessage: expect.any(String)
            });
        });

        it('is less than number', () => {
            const tester = validators.maxNumber(1);
            expect(tester('0')).toEqual({
                valid: true,
                errorMessage: expect.any(String)
            });
        })
    });

    describe('maxCharacters', () => {
        it('has more characters', () => {
            const tester = validators.maxCharacters(3);
            expect(tester('hello')).toEqual({
                valid: false,
                errorMessage: expect.any(String)
            });
        });

        it('has less characters', () => {
            const tester = validators.maxCharacters(8);
            expect(tester('hello')).toEqual({
                valid: true,
                errorMessage: expect.any(String)
            });
        });
    });

    describe('minCharacters', () => {
        it('has more characters', () => {
            const tester = validators.minCharacters(3);
            expect(tester('hello')).toEqual({
                valid: true,
                errorMessage: expect.any(String)
            });
        });

        it('has less characters', () => {
            const tester = validators.minCharacters(8);
            expect(tester('hello')).toEqual({
                valid: false,
                errorMessage: expect.any(String)
            });
        });
    });

    describe('email', () => {
        it('recognizes a valid email', () => {
            const tester = validators.email;
            expect(tester('moomoo@gmail.com')).toEqual({
                valid: true,
                errorMessage: expect.any(String)
            })
        });
    });

    describe('pattern', () => {
        let tester = null;
        let errorMessage = '';

        beforeEach(() => {
            const pattern = /([A-Z])\w+/;
            errorMessage = 'Please enter a Capitalized Word';
            tester = validators.pattern(pattern, errorMessage);
        });

        it('recognizes a pattern and returns errorMessage', () => {
            expect(tester('Hello')).toEqual({
                valid: true,
                errorMessage
            })
        });

        it('recognizes non-matches', () => {
            expect(tester('hello')).toEqual({
                valid: false,
                errorMessage
            })
        })
    });

    describe('required', () => {
        const tester = validators.isRequired;

        it('checks value', () => {
            expect(tester('hello')).toEqual({
                valid: true,
                errorMessage: expect.any(String),
            });
        });
    })
});
