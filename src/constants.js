// ENV's
const DEV = 'DEV';
const PROD = 'PROD';

const CURRENTENV = PROD;

const prodUrl = 'http://api.igdata.xyz';
const localDevUrl = 'http://localhost:5000';

export const apiUri = CURRENTENV === DEV ? localDevUrl : prodUrl;
