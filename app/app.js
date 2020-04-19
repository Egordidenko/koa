import Koa from 'koa';
import connectorsInit from './connectors/index';
import initHandlers from './handlers/index';

import modules from './modules/index';

connectorsInit();

const app = new Koa();

initHandlers(app);
app.use(modules);

app.use(async (ctx) => {
  ctx.body = '<h1>Summary</h1>';
});

export default app;
