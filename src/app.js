const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

function logRequest(req, res, next) {
  const { method, url } = req;
  const logLabel = `[${method.toUpperCase()} ${url}]`
  console.time(logLabel);
  next();
  console.timeEnd(logLabel);
}

app.use(logRequest);
app.get("/repositories", (request, response) => {
  // TODO
  response.json(repositories);
});

app.post("/repositories", (request, response) => {
  // TODO
  const { title, url, techs } = request.body;
  const repository = { id: uuid(), title, url, techs, likes: 0 };
  repositories.push(repository);
  response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;
  const { title, url, techs } = request.body;
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
    response.status(400).json({ error: "Repository not found." })
  };
  const repository = {
    id,
    title,
    url,
    techs,
    likes: repositories[repositoryIndex].likes
  }
  repositories[repositoryIndex] = repository;
  response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);
  if (repositoryIndex < 0) {
    response.status(400).json({ error: "Repository not found." })
  };
  repositories.splice(repositoryIndex, 1);
  response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
  const { id } = request.params;
  //valor retornado -1
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
    response.status(400).json({ error: "Repository not found." })
  };

  const { likes } = repositories[repositoryIndex];

  let countLike = likes + 1;
  const repository = {
    id,
    title: repositories[repositoryIndex].title,
    url: repositories[repositoryIndex].url,
    techs: repositories[repositoryIndex].techs,
    likes: countLike,
  }
  repositories[repositoryIndex] = repository;
  response.json(repository);
});

module.exports = app;

// a rota de post com like deve ser lida novamente