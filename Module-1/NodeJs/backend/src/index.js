const express = require('express');
const cors = require('cors');
const { uuid, isUuid } = require('uuidv4')

const app = express();

app.use(cors());

app.use(express.json());

const projects = []

/**
 * Middlewares => Interceptador de requisições que interromper totalmente a requisição ou alterar os
 * dados da requisição.
 * 
 */

function logReq(req, res, next) {
  const { method, url } = req;

  const logLabel = `[${method.toUpperCase()}] ${url}`;
  console.log(logLabel);

  console.time(logLabel);
  return next(); // Próximo middleware

  console.timeEnd(logLabel); // Executado por úçtimo 
}

function validateProjectId(req, res, next) {
  const { id } = req.params;
  if (!isUuid(id)) {
    return res.status(400).json({ error: 'Invalid project Id!' });
  }
  return next();
}

app.use(logReq)
app.use('/projects/:id', validateProjectId)

app.get('/projects', (req, res) => {
  const { title } = req.query;

  const results = title
    ? projects.filter(project => project.title.includes(title))
    : projects;

  return res.json(results);
})

app.post('/projects', (req, res) => {
  const { title, owner } = req.body;

  const project = { id: uuid(), title, owner }
  projects.push(project)
  return res.json(project)

})

app.put('/projects/:id', (req, res) => {
  const { id } = req.params;
  const { title, owner } = req.body;
  const projectIndex = projects.findIndex(project => project.id === id);

  const validation = projectIndex < 0 ? true : false;

  if (validation) {
    return res.status(400)
      .json({ error: "Project not Found" })
  }

  const project = {
    id,
    title,
    owner,
  };

  projects[projectIndex] = project

  return res.json(project)

})

app.delete('/projects/:id', (req, res) => {
  const { id } = req.params;

  const projectIndex = projects.findIndex(project => project.id === id);

  const validation = projectIndex < 0 ? true : false;

  if (validation) {
    return res.status(400)
      .json({ error: "Project not Found" })
  }

  projects.splice(projectIndex, 1);

  return res.status(204).send();

})


app.listen(3333, () => {
  console.log("Loading... 10%");
  console.log("Loading... 40%");
  console.log("Loading... 55%");
  console.log("Loading... 80%");
  console.log("Loading... 100%");
  console.log("Back-End Started!💻💻💻");
})