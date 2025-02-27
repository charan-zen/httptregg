const { app } = require('@azure/functions');

app.http('jsonplaceholderdata', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        try {
            context.log('Fetching data from API...');
            const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');

            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }

            const data = await response.json();
            context.log("API Response:", JSON.stringify(data, null, 2)); // Log output

            return {
                status: 200,
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' }
            };
        } catch (error) {
            context.log('Error:', error.message);
            return {
                status: 500,
                body: JSON.stringify({ error: "Failed to fetch data", details: error.message })
            };
        }
    }
});
