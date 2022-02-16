import axios from 'axios';

const baseURL = 'https://api.covid19api.com';

export const getCountries = () => axios.get(`${baseURL}/countries`)

export const getCasesByCountry = (slug) => axios.get(`${baseURL}/total/dayone/country/${slug}/status/confirmed`);

