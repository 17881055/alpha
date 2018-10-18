const baseURL = process.env.API_ROOT;

let whitelist = ['/login'];

whitelist = whitelist.map(val => `${baseURL}${val}`);

export default whitelist;
