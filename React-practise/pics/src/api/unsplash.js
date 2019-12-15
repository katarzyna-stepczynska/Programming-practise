import axios from 'axios';

export default axios.create({
    baseURL: 'https://api.unsplash.com',
    headers: {
        Authorization: 'Client-ID 92ef3930402ac1eed35115cae481c86070d8909118673a82b6f767213cde1277'
    }
});