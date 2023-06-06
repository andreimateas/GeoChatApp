

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
export class UserController{

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
}