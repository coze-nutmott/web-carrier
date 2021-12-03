import next from 'next';
import { createServer } from 'https';
import { parse } from 'url';
import path from 'path';
import fs from 'fs';

const port = 443;
const app = next({ dev: true });
const handle = app.getRequestHandler();

const httpsOptions = {
  key: fs.readFileSync(path.resolve(__dirname, '../localhost.key')),
  cert: fs.readFileSync(path.resolve(__dirname, '../localhost.crt')),
};

app.prepare().then(() => {
  createServer(httpsOptions, (req, res) => {
    const parsedUrl = parse(req.url || '', true);
    handle(req, res, parsedUrl);
  }).listen(port, () => {
    // eslint-disable-next-line no-console
    console.info('ready - started server on url: https://localhost:' + port);
  });
});
