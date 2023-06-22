const SERVER_URL = 'http://localhost:3001';

function status(response) {
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
}

function json(response) {
    return response.json();
}
export class FeedPostController{

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

}