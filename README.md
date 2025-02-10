# Running the project

The project has two folders: backend and frontend. They each run separately, the backend runs on port 8080 and the frontend runs on port 5173.

## Get the node packages

```bash
cd frontend
yarn
cd ../backend
yarn
```

## Run the frontend/backend
```bash
cd frontend
yarn dev
```

```bash
cd backend
yarn dev
```

## Explore the database
`npx prisma studio`

Note: the database uses the `dev.db` file for storage. It's empty by default.

## Run tests
```bash
cd frontend
yarn test
```

```bash
cd backend
yarn test
```

# Available endpoints

## `GET /api/poll/active` 

Returns the active poll, or 404 if there is none.

Response:

```json
{
	"id": "string", // uuid
	"question": "string",
	"options": [
		{
			"id": "string", // uuid
			"text": "string",
		},
	]
}
```

## `GET /api/poll/:poll_id/votes` 

Returns a list of votes for a given poll, together with the time at which the vote was made and the chosen option. Returns 404 if no poll with the given id exists.

Response:

```json
{
	"isActive": "boolean", // whether the poll is the currently active poll
	"question": "string",
	"votes": [
		{
			"id": "string", // uuid
			"date": "1970-01-01T00:00:00.000Z", // datetime
			"pollOption": {
				"id": "string", // uuid
				"text": "string"
			}
		}
	]
}
```

## `GET /api/poll/active/vote_count` 

Returns a list of poll options with id, text, and the number of votes, for the active poll.

Response:

```json
{
  "pollOptions": [
    {
			"id": "string", // uuid
			"text": "string",
			"count": "number",
		},
  ]
}
```

## `POST /api/poll/new`

Creates a new poll with the given body. It requires that you provide between 2 and 7 poll options. It returns the created poll back.

Required body:

```json
{
	"question": "string",
	"pollOptions": ["string", "string"]
}
```

Response:

```json
{
	"id": "string", // uuid
	"question": "string",
	"options": [
		{
			"id": "string", // uuid
			"text": "string"
		},
	]
}
```

## `POST /api/poll/:poll_id/poll_option/:poll_option_id/vote`

Creates a vote for the given poll and given poll option. It returns the vote back. It returns 404 if either the poll id or poll option id cannot be found or are not connected.

Response:

```json
{
  "id": "string", // uuid
	"date": "1970-01-01T00:00:00.000Z", // datetime
	"pollOptionId": "string", // uuid
	"pollId": "string", // uuid
}
```