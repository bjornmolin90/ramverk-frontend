const url = "https://js-ramverk-editor-bjmo21.azurewebsites.net";
/* const url = "http://localhost:1337"; */


const auth = {
    register: async function register(user) {
        const response = await fetch(`${url}/user/register`, {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                'content-type': 'application/json'
            },
        });

        const result = await response.json();

        return result;
    },

    login: async function login(user) {
        const response = await fetch(`${url}/user/login`, {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                'content-type': 'application/json'
            },
        });

        const result = await response.json();

        return result;
    },

    getAllUsers: async function getAllUsers() {
        const response = await fetch(`${url}/user/users`);
        const result = await response.json();

        return result.data;
    },
};

export default auth;
