import {app} from './server.ts';
import {env} from '../env.ts';

// Start the server
app.listen(env.PORT, () => {
    console.log(`Server is running on port ${env.PORT} in ${env.APP_STAGE} mode`);
})