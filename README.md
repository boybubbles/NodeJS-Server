# API Endpoints
| HTTP Verbs | Endpoints | Action |
| --- | --- | --- |
| GET | /api/getFiles | To retrieve all items in database |
| POST | /api/upload | To create a new item |
| DELETE | /api/deleteFiles/:id | To delete a single items |

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required** Id of item to fetch |

# Run Locally

Clone the project

```bash
  git clone https://github.com/boybubbles/NodeJS-Server.git
```

Go to the project directory

```bash
  cd NodeJS-Server
```

Install dependencies

```bash
  yarn install
```

Start the server

```bash
  yarn dev
```

