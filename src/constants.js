// ENV's
const DEV = 'DEV';
const PROD = 'PROD';

const CURRENTENV = PROD;

const prodUrl = 'http://192.64.115.144:5000';
const localDevUrl = 'http://localhost:3000';

export const apiUri = CURRENTENV === DEV ? localDevUrl : prodUrl;
