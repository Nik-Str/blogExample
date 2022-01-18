require('dotenv').config();

const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const expressSession = require('express-session');
const mongoStore = require('connect-mongo');
const authMiddleware = require('./middleware/authMiddleware');
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware');
const flash = require('connect-flash');
const validationMiddleware = require('./middleware/validationMiddleware');
const path = require('path');
const port = process.env.PORT || 3000;
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.set('view engine', 'ejs');

//Session options
app.use(
  expressSession({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
      //secure: true,
      sameSite: true,
    },
    rolling: true,
    resave: true,
    store: mongoStore.create({
      mongoUrl: process.env.DATABASE_URL,
      collectionName: 'sessions',
      ttl: 60 * 60,
      autoRemove: 'interval',
      autoRemoveInterval: 10,
      touchAfter: 10 * 60,
      crypto: {
        secret: process.env.SESSION_SECRET,
      },
    }),
  })
);
// Flash
app.use(flash());

//Hide "new user" and "logged" links in header if user is already logged in
global.loggedIn = null;
app.use('*', (req, res, next) => {
  loggedIn = req.session.userId;
  next();
});

//DB connection
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', (err) => console.log(err));
db.on('open', () => console.log('=> Connected to DB'));

//Home
const homeController = require('./controllers/home');
app.get('/', homeController);

//newPost
const newPostController = require('./controllers/newPost');
app.get('/posts/new', authMiddleware, newPostController);

//Get individuell blogg post
const getPostController = require('./controllers/getPost');
app.get('/post/:id', getPostController);

//Post new bloggpost
app.use('/posts/store', validationMiddleware);
const storePostController = require('./controllers/storePost');
app.post('/posts/store', authMiddleware, storePostController);

//Register a new user
const newUserControll = require('./controllers/newUser');
app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserControll);

//Post new user
const storeUserController = require('./controllers/storeUser');
app.post('/users/register', redirectIfAuthenticatedMiddleware, storeUserController);

//Login
const loginController = require('./controllers/login');
app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController);

//Login User controll
const loginUserController = require('./controllers/loginUser');
app.post('/users/login', redirectIfAuthenticatedMiddleware, loginUserController);

//Log out
const logoutController = require('./controllers/logout');
app.get('/auth/logout', logoutController);

//User blog page
const userPostsController = require('./controllers/getUser');
app.get('/user/:id', userPostsController);

//Search page
const searchController = require('./controllers/search');
app.get('/search', searchController);

const searchPostController = require('./controllers/searchPost');
app.post('/search/blog', searchPostController);

//Not found page
app.use((req, res) => res.render('notfound'));

app.listen(port, () => {
  console.log(`=> App is listening on port ${port}!`);
});
