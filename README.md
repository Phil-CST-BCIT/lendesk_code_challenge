# Solution Description

The solution relies on JWT and password hashing.

When a new user signs up, the request will first go through a user validator which checks if user inputs are valid. If all rules are respected, the request will be passed to the next middleware, and the middleware will hash the user's password. Then, the server will create a user in the database, generate a JWT token, and return the token to the user for future use. In every future request for a private resource, the server will ask the user to present the JWT token for authentication.

The JWT token has an expiry set to one day. The secret for generating JWT tokens sits in the .env file. But a better solution could be storing the secret in an isolated place such as AWS Secret Manager.

When a user wants to log in, the server will perform the same validation logic. It will then search for the user record from the database. If the user doesn't exist, the server will end the request with a message indicating the user is not found. Otherwise, the server will verify the user's password, generate a JWT token, and send it back to the user.

The last piece is the "/api/auth/introspect" endpoint. This endpoint is essentially an authorizer. If a valid JWT token is present, it returns true otherwise false.

Adding a Multi-Factor Authentication action will safeguard the API, and it is worth considering. Due to time constraints, the solution doesn't provide this feature.

## Installation

Before running the server, make sure you have installed:

1. Redis
2. Redis-Stack

## Usage

```curl
# POST /api/user/register
curl --location --request POST 'http://localhost:3000/api/user/register' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "MyName",
    "password": "MyComplexPassword"
}'
```

```curl
# POST /api/user/login
curl --location --request POST 'http://localhost:3000/api/user/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "MyName",
    "password": "MyComplexPassword"
}'
```

```curl
# POST /api/auth/introspect
curl --location --request POST 'http://localhost:3000/api/auth/introspect' \
--header 'Content-Type: application/json' \
--data-raw '{
    "token": "JWT",
    "name": "MyName"
}'
```
