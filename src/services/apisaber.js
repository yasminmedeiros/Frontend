import axios from "axios";

const apisaber = axios.create({
    baseURL: 'https://backendphi.onrender.com/',
    //baseURL: 'https://saberpb-aria-backend.herokuapp.com/',
});

export default apisaber;