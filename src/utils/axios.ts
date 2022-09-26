import axios from 'axios';

function rAxios(axiosConfig) {
    const service = axios.create({
        baseURL: 'http://localhost:3000',
        timeout: 20000,
    });

    return service(axiosConfig);
}

export default rAxios;