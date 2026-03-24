import { app } from './app';
import { PORT } from './config/constants';

app.listen(PORT, () => {
  process.stdout.write(`FORM API server running on port ${PORT}\n`);
});
