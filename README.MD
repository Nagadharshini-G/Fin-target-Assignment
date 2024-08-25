Instructions to run in local server:

1. Clone the project repository to your local machine.
2. Open the project files in Visual Studio or your preferred code editor.
3. Install the necessary dependencies.
4. Start the server.
5. Launch Postman.
6. Set the request type to POST and use the URL: http://localhost:3000/api/v1/task.
7. Add a header with:
   - Key: Content-Type
   - Value: application/json
8. Switch the Body tab to "Raw" and ensure the format is set to JSON.

   Example payload:
   json
   {
     "user_id": "123"
   }
   