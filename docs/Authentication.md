---
title: ""
pagination_next: null
pagination_prev: null
---

<h1 style={{ color: '#0D8CFF' }}>Authentication</h1>

All Xemelgo GraphQL and REST APIs are authenticated. Before calling any API, obtain an
`IdToken` from the Login REST API and send it as the `Authorization` header on every request.

## <span style={{ color: '#0D8CFF' }}>Login API</span>

### Endpoint Details

- **URL:** `https://rest.api.xemelgo.com/login`
- **Method:** `POST`

### Properties

| Property   | Type   | Description                      | Required |
| ---------- | ------ | -------------------------------- | -------- |
| `email`    | String | base64 encoded email for user    | Yes      |
| `password` | String | base64 encoded password for user | Yes      |

> Password needs to be a minimum of 8 characters and should contain a number.

### Request Body

```json
{
  "email": "base64_encoded_email",
  "password": "base64_encoded_password"
}
```

**StatusCode** — 200 on success

### Response Body

```json
{
  "AccessToken": "$accessToken",
  "ExpiresIn": 480,
  "TokenType": "Bearer",
  "RefreshToken": "$refreshToken",
  "IdToken": "$idToken"
}
```

Use the `$idToken` as the `Authorization` header for all subsequent API requests:

```http
Authorization: $idToken
```

### Errors

| Error                                | Error code | Exception              |
| ------------------------------------ | ---------- | ---------------------- |
| Incorrect username and/or password   | 400        | NotAuthorizedException |

For authorization errors returned by the GraphQL APIs (expired/invalid/missing token), see
[**Errors**](./Errors.md).
