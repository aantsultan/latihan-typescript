# Contact API Specs

## Create Contact

Endpoint : POST /api/contacts

Request Header :
- X-API-TOKEN : token

Request Body :

```json
{
  "first_name": "Aant",
  "last_name": "Elaina",
  "email": "elaina@mail.com",
  "phone": "123"
}
```

Response Body (Success) :

```json
{
  "data" : {
    "id": 1,
    "first_name": "Aant",
    "last_name": "Elaina",
    "email": "elaina@mail.com",
    "phone": "123"
  }
}
```

Response Body (Failed) :

```json
{
  "errors" : "first_name must not blank, ..."
}
```

## Get Contact

Endpoint : GET /api/contacts/:id

Request Header :
- X-API-TOKEN : token

Response Body (Success) :

```json
{
  "data" : {
    "id": 1,
    "first_name": "Aant",
    "last_name": "Elaina",
    "email": "elaina@mail.com",
    "phone": "123"
  }
}
```

Response Body (Failed) :

```json
{
  "errors" : "contact is not found"
}
```

## Update Contact

Endpoint : PUT /api/contacts/:id

Request Header :
- X-API-TOKEN : token

Request Body :

```json
{
  "first_name": "Aant",
  "last_name": "Elaina",
  "email": "elaina@mail.com",
  "phone": "123"
}
```

Response Body (Success) :

```json
{
  "data" : {
    "id": 1,
    "first_name": "Aant",
    "last_name": "Elaina",
    "email": "elaina@mail.com",
    "phone": "123"
  }
}
```

Response Body (Failed) :

```json
{
  "errors" : "first_name must not blank, ..."
}
```

## Remove Contact

Endpoint : DELETE /api/contacts/:id

Request Header :
- X-API-TOKEN : token

Response Body (Success) :

```json
{
  "data" : "OK"
}
```

Response Body (Failed) :

```json
{
  "errors" : "Contact is not found"
}
```

## Search Contact

Endpoint : GET /api/contacts

Query Parameter :
- name : string, contact first name or contact last name, optional
- phone : string, contact phone, optional
- email : string, contact email, optional
- page : number, default 1
- size : number, default 10

Request Header :
- X-API-TOKEN : token

Response Body (Success) :

```json
{
  "data" : [
    {
      "id": 1,
      "first_name": "Aant",
      "last_name": "Elaina",
      "email": "elaina@mail.com",
      "phone": "123"
    },
    {
      "id": 2,
      "first_name": "Aant 2",
      "last_name": "Elaina 2",
      "email": "elaina2@mail.com",
      "phone": "1232"
    }
  ],
  "paging" : {
    "current_page": 1,
    "total_size": 10,
    "size": 10
  }
}
```

Response Body (Failed) :

```json
{
  "errors" : "Unauthorized"
}
```