// ENV's
const DEV = "DEV";
const PROD = "PROD";

const CURRENTENV = PROD;

const herokuProdUrl =
  "http://ec2-13-250-102-178.ap-southeast-1.compute.amazonaws.com/";
const localDevUrl = "http://localhost:5000";

export const apiUri = CURRENTENV === DEV ? localDevUrl : herokuProdUrl;
