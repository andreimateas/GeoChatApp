

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
export class UserController{

    /**
     * Logs in a user.
     * @param {User} user - The user object containing login credentials.
     * @returns {Promise<Object>} A promise that resolves to the server's response.
     */
     login(user){
        const myheaders = new Headers();
        myheaders.append('Accept', 'application/json');
        myheaders.append('Content-Type', 'application/json');

        const header = {
            method: 'POST',
            headers: myheaders,
            mode: 'cors',
            body: JSON.stringify(user),

     };
        const loginUrl = SERVER_URL + '/login';

         console.table('Sending data to server:', user);
        return fetch(loginUrl, header)
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

    logout(username){
        const myheaders = new Headers();
        myheaders.append('Accept', 'application/json');
        myheaders.append('Content-Type', 'application/json');

        const header = {
            method: 'POST',
            headers: myheaders,
            mode: 'cors'

        };
        const serverUrl = SERVER_URL + '/logout?username='+username;

        console.table('Sending data to server:', username);
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
     * Registers a new user.
     * @param {User} user - The user object to be registered.
     * @returns {Promise<Object>} A promise that resolves to the server's response.
     */
    register(user){
        const myheaders = new Headers();
        myheaders.append('Accept', 'application/json');
        myheaders.append('Content-Type', 'application/json');

        const header = {
            method: 'POST',
            headers: myheaders,
            mode: 'cors',
            body: JSON.stringify(user),

        };
        const loginUrl = SERVER_URL + '/adduser';

        console.table('Sending data to server:', user);
        return fetch(loginUrl, header)
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
     * Retrieves user data based on the username.
     * @param {string} username - The username of the user to retrieve.
     * @returns {Promise<Object>} A promise that resolves to the user data.
     */
    getUser(username){
        const myheaders = new Headers();
        myheaders.append('Accept', 'application/json');
        myheaders.append('Content-Type', 'application/json');

        const header = {
            method: 'GET',
            headers: myheaders,
            mode: 'cors'

        };
        const serverUrl = SERVER_URL + '/getuser?username='+username;

        console.table('Sending data to server:', username);
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