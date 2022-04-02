let host = process.env.REACT_APP_LOCAL_HOST || 'http://localhost:1337';

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