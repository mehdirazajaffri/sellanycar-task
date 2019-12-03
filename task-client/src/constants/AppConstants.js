export const APIURL =
           process.env.REACT_APP_API_HOST +
               process.env.REACT_APP_API_VERSION_URL ||
           "http://localhost:8009/api";
console.log(process.env);
