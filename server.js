const express = require ('express');
const cors = require ('cors');
const {router} = require('./routes/routes.js');
const {DBConnection} = require ('./db.js');

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', router);

const PORT = 8000;

DBConnection();

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));