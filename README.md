# Two Factor Demo
This project is used to demonstrate two factor authentication.

Setup
1. Clone the repo.
2. Run ```npm run install``` in the project terminal.
3. create .env in the root directory.
4. Run npm run dev to start the project.
5. Contents of .env file
```
MONGODB_URI=<mongod-url>
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<secrect-token>
APP_NAME=<APP_NAME>
```