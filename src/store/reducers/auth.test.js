import reducer from './auth';
import actions from '../actions/actionTypes';

describe('Auth reducer', () => {
    const initialState = {
        token: null,
        error: null,
        userId: null,
        loading: false
    };

    it('should return initial State for invalid action type', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('should return token for login action type', () => {
        expect(reducer(initialState, {
            type: actions.AUTH_SUCCESS,
            payload: {
                userId: "localId",
                token: "idToken"
            }
        })).toEqual({
            token: "idToken",
            error: null,
            userId: "localId",
            loading: false
        })
    });
});