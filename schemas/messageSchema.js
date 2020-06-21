
const message = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "properties": {
      "mail": {
          "format": "email",
          "minLength": 2,
          "maxLength": 18,
          "require": true,
      },
      "name": {
          "type": "string",
          "minLength": 3,
          "maxLength": 18,
          "require": true,
      },
      "message": {
          "type": "string",
      }
  },
};
module.exports = message;
