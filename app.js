import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes.js';
import htmlExpress from 'html-express-js';
import cors from 'cors';

const app = express();
const PORT = 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);
app.use(cors());

// set up engine
app.engine(
  'js',
  htmlExpress({
    includesDir: 'includes', // where all includes reside
  }),
);
// use engine
app.set('view engine', 'js');

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
