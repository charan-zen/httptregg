const fetch = require('node-fetch');

module.exports = async function (context, req) {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
        const data = await response.json();

        context.res = {
            status: 200,
            body: data,
            headers: {
                'Content-Type': 'application/json'
            }
        };
    } catch (error) {
        context.res = {
            status: 500,
            body: { error: "Failed to fetch data", details: error.message }
        };
    }
};
