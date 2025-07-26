const express = require('express');
const app = express();
const PORT = 3000;

const agentesRouter = require('./routes/agentesRoutes');
const casosRouter = require('./routes/casosRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./docs/swagger');

app.use(express.json());

app.use('/agentes', agentesRouter);
app.use('/casos', casosRouter);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(PORT, () => {
  console.log(`Servidor do Departamento de Polícia rodando em http://localhost:${PORT}`);
});
