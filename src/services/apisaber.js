import axios from "axios";

const apisaber = axios.create({
    baseURL: 'http://localhost:3001',
    //baseURL: 'https://saberpb-aria-backend.herokuapp.com/',
});

export default apisaber;