import { Document, Types } from 'mongoose';

export interface User extends Document {
  email: string;
  birthdate: Date
  firstName: string
  lastName: string
  middleName?: string
  sex: string
  report: {
    title: String,
    value: String,
    id: Types.ObjectId,
    type: String,
  }[],
  reportVersion: Number,
}

export const MappingUser = {
  "properties": {
    "email": {
      "type": "text"
    },
    "birthdate": {
      "type": "date",
      "format": "text"
    },
    "firstName": {
      "type": "text"
    },
    "lastName": {
      "type": "text"
    },
    "middleName": {
      "type": "text"
    },
    "sex": {
      "type": "keyword"
    },
    "report": {
      "type": "nested",
      "properties": {
        "title": {
          "type": "text"
        },
        "value": {
          "type": "text",
          "fields": {
            "keyword": {
              "type": "keyword"
            },
            "boolean": {
              "type": "boolean"
            },
            "numeric": {
              "type": "float"
            },
            "date": {
              "type": "date",
              "format": "strict_date_optional_time||epoch_millis"
            }
          }
        },
        "id": {
          "type": "keyword"
        },
        "type": {
          "type": "keyword"
        }
      }
    },
    "reportVersion": {
      "type": "integer"
    }
  }
}