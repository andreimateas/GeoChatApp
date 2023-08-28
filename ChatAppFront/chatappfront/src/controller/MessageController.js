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
export class MessageController{

    /**
     * Retrieves all messages from the server.
     * @returns {Promise<Array>} A promise that resolves to an array of messages.
     */
    getMessages(){
        const myheaders = new Headers();
        myheaders.append('Accept', 'application/json');
        myheaders.append('Content-Type', 'application/json');

        const header = {
            method: 'GET',
            headers: myheaders,
            mode: 'cors'

        };
        const serverUrl = SERVER_URL + '/getmessages';

        console.table('Sending data to server: request all messages');
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
     * Adds a new message to the server.
     * @param {Message} message - The message object to be added.
     * @returns {Promise<Object>} A promise that resolves to the server's response.
     */
    addMessage(message){
        const myheaders = new Headers();
        myheaders.append('Accept', 'application/json');
        myheaders.append('Content-Type', 'application/json');

        const header = {
            method: 'POST',
            headers: myheaders,
            mode: 'cors',
            body: JSON.stringify(message),

        };
        const serverUrl = SERVER_URL + '/addmessage';

        console.table('Sending data to server:', message);
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
     * Retrieves messages between two users from the server.
     * @param {string} user1 - The username of the first user.
     * @param {string} user2 - The username of the second user.
     * @returns {Promise<Array>} A promise that resolves to an array of messages between the users.
     */
    getMessagesByUsers(user1, user2){
        const myheaders = new Headers();
        myheaders.append('Accept', 'application/json');
        myheaders.append('Content-Type', 'application/json');

        const header = {
            method: 'GET',
            headers: myheaders,
            mode: 'cors'


        };
        const serverUrl = SERVER_URL + '/getmessagesbyusers/?user1=' + user1 + '&user2=' + user2;

        console.table('Sending data to server: request all messages');
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