const url = "https://js-ramverk-editor-bjmo21.azurewebsites.net";
/* const url = "http://localhost:1337"; */

const graphql = {
    docUsers: async function docUsers(docName) {
        const response = await fetch(`${url}/graphql`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({ query: `{ doc (name: "${docName}") {users} }` })
        });

        const result = await response.json();

        return result.data;
    }
};

export default graphql;
