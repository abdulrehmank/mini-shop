# Product Catalogue Management App ![CI status](https://img.shields.io/badge/build-passing-brightgreen.svg)

The Node.js application for building Product Catalogue and manage it to some extent.

## Installation

### Requirements
* Node.js
* Mongodb

### Installing dependencies
`$ npm install `

## API's

### Add a category

```
POST /category

requestBody {
  "name": "string",
  "parentCategory": ["categoryIDs"]
}
```

### Add Product mapped to a category or categories.

```
POST /product

requestBody {
  "name": "string",
  "description": "string",
  "price": Number,
  "categories": ["categoryIDs"]
}

```

### Get all categories with all its child categories mapped to it.
```
GET /category
```

### Get all products by a category.

```
GET /product/category/:categoryId
```

### Update product details (name,price,etc)
```
PUT /product/:productId

requestBody {
  "name": "string",
  "description": "string",
  "price": Number,
  "categories": ["categoryIDs"]
}
```

## How to run the App
```
$ npm start
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)