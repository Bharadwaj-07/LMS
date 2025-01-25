const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
require('./dbServer')

const coursesAvailableRouter = require('./routes/CoursesAvailableRouter')
const CreateClassRouter = require('./routes/CreateClassRouter')
const JoinClassRouter = require('./routes/JoinClassRoute');
const marksRouter = require('./routes/MarksRouter')

const app = express();

const PORT = 3000

app.use(bodyParser.json())
app.use(cors());

app.use('/coursesAvailable', coursesAvailableRouter.router);
app.use('/createClass', CreateClassRouter);
app.use('/joinClass', JoinClassRouter);
app.use('/marks', marksRouter);

app.listen(PORT, () => {
    console.log("Server is running on port : " + PORT)
})