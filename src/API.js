let host = process.env.REACT_APP_LOCAL_HOST || '';
const endpoints = {
    getPosts: 'posts',
    addPost: 'posts',
    topCreators: 'statistics/topcreators',
    avgRunTime: 'statistics/runtimes',
    getPostCount: 'postnumber'
}

class API {
    static get(entry) {
        if (endpoints[entry]) {
            return host + '/' + endpoints[entry];
        }
        throw new Error('Missing endpoint ' + entry);
    }
}

export default API;