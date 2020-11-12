// ENV's
const DEV = "DEV";
const PROD = "PROD";

const CURRENTENV = PROD;

const prodUrl = "http://13.229.71.34:8080";
const localDevUrl = "http://localhost:5000";

export const apiUri = CURRENTENV === DEV ? localDevUrl : prodUrl;
