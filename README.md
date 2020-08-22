# Docker Multi Container Workflow

## Architecture

![multi](./README/multi.png)
![process](./README/process.png)

- Postgres -> for permanent storage
- Redis -> for in memory storage
- worker -> calculates fibonacci

## nginx

- default.conf
- helps in mappings/routing
- incoming/outgoing requests redirection to frontend and backend
- serves local files
- backend is at 5000 PORT
- frontend is at 3000 PORT
- we'll listen on PORT 80

## travis

- run tests
- build prod images
- pushes to docker hub
- tells aws to use these images from hub