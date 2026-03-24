import { initMongoDB } from './db/initMongoDB.js';
import { setupServer } from './server.js';
import { createDirIfNotExist } from './utils/createDirIfNotExist.js';

import { UPLOAD_DIR, TEMP_UPLOAD_DIR } from './constants/index.js';

const bootstrap = async () => {
    await initMongoDB();
    await createDirIfNotExist(TEMP_UPLOAD_DIR);
    await createDirIfNotExist(UPLOAD_DIR);

    setupServer();
};
void bootstrap();
