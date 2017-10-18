# soccer-players-api

Manages a list of the best soccer players in the world/

## Endpoints 1.0

## PLAYERS

## Create a player
`POST /players`
**Example**
```
POST /players
```
**Sample Request Body JSON Data**
```
{
  "_id": 'player_cristiano_ronaldo',
  "name": 'Cristiano Ronaldo',
  "nationality": 'Portuguese',
  "yearBorn": 1985,
  "position": 'forwarder',
  "goals": 998,
  "titles": 14,
  "club": { name: 'Real Madrid', location: 'Madrid' },
  "type": "player"
}
```
**Sample Response**
```
"ok": true,
"id": player_cristiano_ronaldo,
"rev": "74508hf2in237y487hr38y8357"
```
## Grab a player
`GET /players/{id}`
**Example**
```
GET /players/player_cristiano_ronaldo
```

## Update a player
`PUT /players/{id}`
**Example**
```
PUT /players/player_cristiano_ronaldo
```

## Delete a player
`DELETE /players/{id}`
**Example**
```
DELETE /players/player_cristiano_ronaldo
```


## Endpoints 2.0

Verb   | Endpoint                 |  Description                
-------|--------------------------|-----------------------------
`GET`  | `/players`               | Get a collection of players.  Optional `filter` query string provides the ability to filter by `name`, `yearBorn`, `goals`, and `titles`.

## Use Cases

### Retrieve a list of players

`GET /players`

### Search a player by name

** Sample Request **
`GET /players?filter=name:cristiano ronaldo`

*** Sample Response **

```
[
      {
        "_id": 'player_cristiano_ronaldo',
        "_rev": "6-3c7e00b9d8dd077920c322086153b650",
        "name": 'Cristiano Ronaldo',
        "nationality": 'Portuguese',
        "yearBorn": 1985,
        "position": 'forwarder',
        "goals": 998,
        "titles": 14,
        "club": { name: 'Real Madrid', location: 'Madrid' },
        "type": "player"
      }  
]
```
