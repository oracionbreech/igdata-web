// ENV's
const DEV = "DEV";
const PROD = "PROD";

const CURRENTENV = DEV;

const herokuProdUrl = "https://evening-shelf-86686.herokuapp.com";
const localDevUrl = "http://localhost:5000";

export const apiUri = CURRENTENV === DEV ? localDevUrl : herokuProdUrl;
