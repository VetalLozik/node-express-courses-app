const express = require('express');
const path = require('path');
const csrf = require('csurf');
const flash = require('connect-flash')
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const session = require('express-session');
const MongoStore = require('connect-mongodb-session')(session);
const homeRoutes = require('./routs/home');
const helmet = require('helmet');
const compression = require('compression')
const addRoutes = require('./routs/add');
const authRoutes = require('./routs/auth');
const cardRoutes = require('./routs/card');
const coursesRoutes = require('./routs/courses');
const ordersRoutes = require('./routs/orders');
const profileRoutes = require('./routs/profile');
const varMiddleware = require('./middleware/variables')
const userNiddleware = require('./middleware/user')
const errorHandler =  require('./middleware/error')
const fileMiddleware = require('./middleware/file')
const keys = require('./keys')

const PORT = process.env.PORT || 3000;


const app = express();
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
    helpers: require('./utils/hbs-helpers')
})

const store = new MongoStore({
    collection: 'sessions',
    uri: keys.MONGO_URI
})

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');


app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')))
app.use(express.urlencoded({extended: true}))
app.use(session({
    secret: keys.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store
}))

app.use(fileMiddleware.single('avatar'))

app.use(csrf())
app.use(flash())
app.use(helmet())
app.use(compression())
app.use(varMiddleware)
app.use(userNiddleware)

app.use('/',homeRoutes);
app.use('/add',addRoutes);
app.use('/courses',coursesRoutes);
app.use('/card', cardRoutes);
app.use('/orders', ordersRoutes);
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);


app.use(errorHandler)

async function start() {
    try{
        
        await mongoose.connect('mongodb+srv://lozik:sKD8vwr0wD7ydm7J@cluster0-ngfto.mongodb.net/shop', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useNewUrlParser: true
        })

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    }catch(e){
        console.log(e)
    }
    
}

start()




