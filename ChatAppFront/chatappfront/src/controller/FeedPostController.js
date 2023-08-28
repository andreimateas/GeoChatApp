
const SERVER_URL = 'http://localhost:3001';


/**
 * Checks the response status and resolves or rejects the promise accordingly.
 * @param {Response} response - The response object from the fetch request.
 * @returns {Promise} A promise that resolves if the response status is in the success range, and rejects otherwise.
 */
function status(response) {
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
}

/**
 * Parses the JSON response of a fetch request.
 * @param {Response} response - The response object from the fetch request.
 * @returns {Promise<Object>} A promise that resolves to the parsed JSON data.
 */
function json(response) {
    return response.json();
}
export class FeedPostController{

    /**
     * Retrieves all feed posts from the server.
     * @returns {Promise<Array>} A promise that resolves to an array of feed posts.
     */
    getFeedPosts(){
        const myheaders = new Headers();
        myheaders.append('Accept', 'application/json');
        myheaders.append('Content-Type', 'application/json');

        const header = {
            method: 'GET',
            headers: myheaders,
            mode: 'cors'

        };
        const serverUrl = SERVER_URL + '/getfeedposts';

        console.table('Sending data to server: request all posts');
        return fetch(serverUrl, header)
            .then(status)
            .then(json)
            .then((data) => {
                console.log('Request succeeded with JSON response', data);
                return data;
            })
            .catch(error=>{
                console.error('Error:',error);
                throw error;
            })
    }

    /**
     * Adds a new feed post to the server.
     * @param {FeedPost} feedPost - The feed post object to be added.
     * @returns {Promise<Object>} A promise that resolves to the server's response.
     */
    addFeedPost(feedPost){
        const myheaders = new Headers();
        myheaders.append('Accept', 'application/json');
        myheaders.append('Content-Type', 'application/json');

        const header = {
            method: 'POST',
            headers: myheaders,
            mode: 'cors',
            body: JSON.stringify(feedPost),

        };
        const serverUrl = SERVER_URL + '/addfeedpost';

        console.table('Sending data to server:', feedPost);
        return fetch(serverUrl, header)
            .then(status)
            .then(json)
            .then((data) => {
                console.log('Request succeeded with JSON response', data);
                return data;
            })
            .catch(error=>{
                console.error('Error:',error);
                throw error;
            })

    }

}