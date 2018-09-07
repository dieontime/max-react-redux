import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-builder-d9d93.firebaseio.com/'
});

export default instance;