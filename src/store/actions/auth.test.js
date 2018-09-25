import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import actions from './actionTypes';
import { auth } from './auth';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Auth action creator', () => {
    let instance;
    let mock;

    beforeEach(() => {
        instance = axios.create();
        mock = new MockAdapter(axios);
    });

    afterEach(() => {
        mock.reset();
    });

    it('should return type and payload', () => {
        const actionResult = auth('abc', 'pwd', false);
        expect(actionResult).toBeDefined();
    });

    it('should dispatch AUTH_SUCCESS on auth()', () => {
        mock.onPost('/identitytoolkit/v3/relyingparty/verifyPassword').reply(200, {
            data: {
                localId: "localid",
                idToken: "token"
            }
        });

        const expectedActions = [
            { type: actions.AUTH_START },
            {
                type: actions.AUTH_SUCCESS, payload: {
                    userId: "localid",
                    token: "token"
                }
            }
        ];

        const store = mockStore({
            auth: {
                token: null,
                userId: null
            }
        });
        store.dispatch(auth('username', 'password', false)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});