# User API Specs

## Register User

Endpoint : POST /api/users
Request Body :

```json
{
  "username": "aant",
  "password": "rahasia",
  "name": "Aant Sultan"
}
```

Response Body (Success) :

```json
{
  "data" : {
    "username": "aant",
    "name": "Aant Sultan"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "Username most not blank, ..."
}
```

## Login User

Endpoint : POST /api/users/login
Request Body :

```json
{
  "username": "aant",
  "password": "rahasia",
}
```

Response Body (Success) :

```json
{
  "data" : {
    "username": "aant",
    "name": "Aant Sultan",
    "token": "token UUID"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "Username or Password is wrong"
}
```

## Get User

Endpoint : GET /api/users/current

Request Header : 
- X-API-TOKEN : token UUID

Response Body (Success) :

```json
{
  "data" : {
    "username": "aant",
    "name": "Aant Sultan"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "Unauthorized"
}
```

## Update User

Endpoint : PATCH /api/users/current

Request Header :
- X-API-TOKEN : token UUID

Request Body :

```json
{
  "password": "rahasia", // tidak wajib
  "name": "Aant Sultan" // tidak wajib
}
```

Response Body (Success) :

```json
{
  "data" : {
    "username": "aant",
    "name": "Aant Sultan"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "Unauthorized"
}
```

## Logout User
Endpoint : DELETE /api/users/current

Request Header :
- X-API-TOKEN : token UUID

Response Body (Success) :

```json
{
  "data" : "OK"
}
```

Response Body (Failed) :

```json
{
  "errors": "Unauthorized"
}
```
