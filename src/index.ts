import app from './app';
import { createDirIfNotExist } from './util';

const port = 3000;

createDirIfNotExist('./src/images/thumb/');
app.listen(port, () => console.log(`server started at http://localhost:${port}`));
