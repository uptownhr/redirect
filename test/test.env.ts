const path = require('path');
const testEnvPath = path.join(__dirname, '/test.env');
require('dotenv').config({ path: testEnvPath });
