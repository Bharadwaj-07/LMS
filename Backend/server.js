const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const ProfileRoutes=require('./routes/ProfileRouter');
const AttendanceRoutes=require('./routes/AttendanceRouter');
const cookieParser = require('cookie-parser');

const coursesAvailableRouter = require('./routes/CoursesAvailableRouter')
const CreateClassRouter = require('./routes/CreateClassRouter')
const JoinClassRouter = require('./routes/JoinClassRoute');
const marksRouter = require('./routes/MarksRouter')
const QuizRouter=require("./Routes/QuizRouter")
const App = express();

// Middleware
App.use(cors({
  origin: 'http://localhost:8081',
  credentials: true,
}
));

App.use(express.json());
App.use(cookieParser());


mongoose
    .connect("mongodb://127.0.0.1:27017/DB", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('Connected to MongoDB successfully!');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error.message);
    });

const conn = mongoose.connection;
conn.on("error", (err) => console.error.bind(console, "DB connection error"));
conn.once('open', () => { console.log("Connected to DataBase.") });


App.use('/api/Users', ProfileRoutes)

App.use('/coursesAvailable', coursesAvailableRouter.router);
App.use('/createClass', CreateClassRouter);
App.use('/joinClass', JoinClassRouter);
App.use('/marks', marksRouter);
App.uses('/quiz',QuizRouter);
App.use('/api/Attendance', AttendanceRoutes)



const PORT = 5000;
App.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});