const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/user');
require('./services/passport');

mongoose.connect(`mongodb+srv://${ keys.mongo.username }:${ keys.mongo.password }@nodetodo-lbwsd.mongodb.net/${ process.env.DATABASE || 'emaily-dev' }?retryWrites=true&w=majority`, { useNewUrlParser: true });

console.log(process.env.PORT);

const app = express();

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [ keys.cookieKey ]
    })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(5000);

