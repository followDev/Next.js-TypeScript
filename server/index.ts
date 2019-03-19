import { createServer } from 'http';
import { parse } from 'url';
import * as next from 'next';

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const startApp = async () => {
  await app.prepare();
  createServer((req, res) =>
    handle(req, res, parse(req.url || '', true))
  ).listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
};

startApp();
