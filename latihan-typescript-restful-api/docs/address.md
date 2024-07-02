# Address API Specs

## Create Address

Endpoint : POST /api/contacts/:idContact/addresses

Request Header :
- X-API-TOKEN : token UUID

Request Body :

```json
{
  "street": "sungai bambu",
  "city": "jakarta utara",
  "province": "dki jakarta",
  "country": "indonesia",
  "postal_code": "14330"
}
```

Response Body (Success) :

```json
{
  "data": {
    "id": 1,
    "street": "sungai bambu",
    "city": "jakarta utara",
    "province": "dki jakarta",
    "country": "indonesia",
    "postal_code": "14330"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "Postal code is required"
}
```

## Get Address

Endpoint : GET /api/contacts/:idContact/addresses/:idAddress

Request Header :
- X-API-TOKEN : token UUID

Response Body (Success) :

```json
{
  "data": {
    "id": 1,
    "street": "sungai bambu",
    "city": "jakarta utara",
    "province": "dki jakarta",
    "country": "indonesia",
    "postal_code": "14330"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "Address not found"
}
```

## Update Address

Endpoint : PUT /api/contacts/:idContact/addresses/:idAddress

Request Header :
- X-API-TOKEN : token UUID

Request Body :

```json
{
  "street": "sungai bambu",
  "city": "jakarta utara",
  "province": "dki jakarta",
  "country": "indonesia",
  "postal_code": "14330"
}
```

Response Body (Success) :

```json
{
  "data": {
    "id": 1,
    "street": "sungai bambu",
    "city": "jakarta utara",
    "province": "dki jakarta",
    "country": "indonesia",
    "postal_code": "14330"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "postal code is required"
}
```

## Remove Address

Endpoint : DELETE /api/contacts/:idContact/addresses/:idAddress

Request Header :
- X-API-TOKEN : token UUID

Response Body (Success) :

```json
{
  "data": "OK"
}
```

Response Body (Failed) :

```json
{
  "errors": "Address is not found"
}
```

## List Address

Endpoint : DELETE /api/contacts/:idContact/addresses

Request Header :
- X-API-TOKEN : token UUID

Response Body (Success) :

```json
{
  "data": [
    {
      "id": 1,
      "street": "sungai bambu",
      "city": "jakarta utara",
      "province": "dki jakarta",
      "country": "indonesia",
      "postal_code": "14330"
    },
    {
      "id": 2,
      "street": "sungai bambu 2",
      "city": "jakarta utara 2",
      "province": "dki jakarta 2",
      "country": "indonesia 2",
      "postal_code": "143302"
    }
  ]
}
```

Response Body (Failed) :

```json
{
  "errors": "Contact is not found"
}
```