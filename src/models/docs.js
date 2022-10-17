/* const url = "https://js-ramverk-editor-bjmo21.azurewebsites.net"; */
const url = "http://localhost:1337";

const docs = {
    getAllDocs: async function getAllDocs() {
        const response = await fetch(`${url}/docs`);
        const result = await response.json();

        return result.data;
    },

    saveDoc: async function saveDoc(newDoc) {
        const response = await fetch(`${url}/docs`, {
            body: JSON.stringify(newDoc),
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST'
        });

        const result = await response.json();

        return result.data;
    },
    updateDoc: async function updateDoc(newDoc) {
        const response = await fetch(`${url}/docs`, {
            body: JSON.stringify(newDoc),
            headers: {
                'content-type': 'application/json'
            },
            method: 'PUT'
        });

        const result = await response.json();

        return result.data;
    },
    addUser: async function addUser(newUser) {
        await fetch(`${url}/docs/user`, {
            body: JSON.stringify(newUser),
            headers: {
                'content-type': 'application/json'
            },
            method: 'PUT'
        });
    }
};

export default docs;
