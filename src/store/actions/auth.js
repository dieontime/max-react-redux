import axios from 'axios';
import actions from './actionTypes';

export const authStart = () => {
    return {
        type: actions.AUTH_START
    };
};

export const authSuccess = (authData) => {
    return {
        type: actions.AUTH_SUCCESS,
        payload: {
            userId: authData.localId,
            token: authData.idToken
        }
    };
};

export const authFail = (error) => {
    return {
        type: actions.AUTH_FAIL,
        payload: error
    }
}

export const auth = (uid, pwd, isSignUp) => {
    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBZ2nbb4VqNLyyoeyNFEIne9NyqYY9m7pw';

    if (!isSignUp) {
        url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBZ2nbb4VqNLyyoeyNFEIne9NyqYY9m7pw';
    }
    return dispatch => {
        dispatch(authStart());
        axios.post(url, { email: uid, password: pwd, returnSecureToken: true })
            .then(res => {
                dispatch(authSuccess(res.data));
            })
            .catch(err => {
                console.error(err);
                dispatch(authFail(err));
            });
    };
};