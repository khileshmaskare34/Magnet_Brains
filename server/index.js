const express = require('express');
const connectDB = require('./config/db');
const userRouter = require('./routes/users')
const taskRouter = require('./routes/tasks')
// const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
require('dotenv').config();

const app = express();
connectDB();

app.use(morgan('dev'));

// app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser())

app.use('/server/tasks', taskRouter);
app.use('/server/users', userRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
