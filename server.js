const dotenv = require('dotenv');
const path = require('path');
const app = require('./app');

dotenv.config({ path: path.resolve(__dirname, '.env') });

const URL = `http://localhost:${process.env.APP_PORT}`
app.listen(process.env.APP_PORT, () => {
  console.log(`Serveur lancé sur ${URL}`);
  console.log(`Swagger UI disponible sur ${URL}${process.env.APP_SWAGGER_URL}`);
});
