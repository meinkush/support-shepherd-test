## Description

Test project for support shepherd

## Installation

```bash
$ npm install
```

## Running the app

before anything create a .env file based on the `.env-example` file presented,
default values should work for testing purposes then start all services

all services should be running before calling the api

```bash
# setup containers
$ docker-compose up
# run temporal worker
$ npm run temporal-worker:start
# start api
$ npm run start
```

## Usage

### create message

to create a message for signing use the POST method endpoint `http://localhost:3000/message`

with this body structure

```
{
    "id": <id to use in the format of uuid>,
    "message": <message to be signed in string format>
}
```

example:

```
curl -XPOST -H "Content-type: application/json" -d '{
    "id": "49f5083c-a325-4609-a258-e61469cb1f9f",
    "message": "this is a test message"
}' 'http://localhost:3000/message'

```

response should be a json object including the id used if everything went well

```
{
  "id":
  "49f5083c-a325-4609-a258-e61469cb1f9f"
}
```

### retrieve signed message

to retrieve a signed message use the GET endpoint `http://localhost:3000/message/:id`
where `:id` should be substituted by the id used to send the message

example:

```
curl -XGET 'http://localhost:3000/message/49f5083c-a325-4609-a258-e61469cb1f9f'
```

should return the message, status and signature(in base64 format) in case it's already been signed

```
{
    "id": "49f5083c-a325-4609-a258-e61469cb1f9f",
    "message": "this is a test message",
    "signature": "WWZpmN0AWqCC2aDxN5cYGqfe00QygL1YC/Eg6x7xQGpDwVwWoerT76k6Fc2/oVkjtzD71lQxEZ0hkvAy+y7ABA==",
    "status": "SIGNED"
}
```