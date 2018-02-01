require('dotenv').config();

const express = require('express')
    , bodyParser = require('body-parser')
    , passport = require('passport')
    , Auth0Strategy = require('passport-auth0')
    , massive = require('massive')
    , session = require('express-session')
    , config = require('./config.js')
    , cloudinary = require('cloudinary')
    , cors = require('cors')
    , {domain, clientID, clientSecret} = config;

const app = express();
app.use(cors())
app.use(bodyParser.json())

app.use(session({
  secret: "ajdpawjdjdm",
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/../build'));

massive(process.env.CONNECTION_STRING).then( db => {
  app.set('db', db);
  console.log('db is in the bag')
})

passport.use(new Auth0Strategy({
  domain: domain,
  clientID: clientID,
  clientSecret: clientSecret,
  callbackURL: '/auth/callback',
  scope: 'openid profile'
}, function(accessToken, refreshToken, extraParams, profile, done) {
    console.log(profile)
  const db = app.get('db');

    const { displayName, picture, user_id } = profile

  db.find_user([ user_id ])
  .then( user => {
   if ( user[0] ) {
     return done( null, { id: user[0].id } );
   } else {
     db.create_user([displayName, picture, user_id])
     .then( user => {

        return done( null, { id: user[0].id } );
     })
   }
  })


}));

app.get('/auth', passport.authenticate('auth0'));

app.get('/auth/callback', passport.authenticate('auth0', {
  successRedirect: process.env.REACT_APP_SUCCESS,
  failureRedirect: process.env.REACT_APP_FAILURE
}))

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  app.get('db').find_session_user([user.id])
  .then( user => {
    return done(null, user[0]);
  })
});

app.get('/auth/me', (req, res, next) => {
  if (!req.user) {
    return res.status(401).send('Log in required');
  } else {
    return res.status(200).send(req.user);
  }
})

app.get('/auth/logout', (req, res) => {
  req.logOut();
  return res.redirect(process.env.REACT_APP_SUCCESS);
})

app.post('/api/cloudinaryImage', (req, res) => { 
  const db = req.app.get('db')
  const {img, authID, gpu, ram, motherboard, processor, compcase, powersupply, mice, keyboard, headset, microphone, mousepad, monitor} = req.body
  db.addImageDB([img, authID, gpu, ram, motherboard, processor, compcase, powersupply]).then(resp => {
    console.log('PLEASE HAVE INFO', resp); 
    db.peripheralsDB([mice, keyboard, headset, microphone, mousepad, monitor, resp[0].id]).then(resp => {
      res.status(200).send('added')
    })
  })
  console.log("Hardware", req.body);
})

app.get('/api/final', (req, res) => {
  const db = req.app.get('db')
  db.joinTable().then(resp => {
    res.status(200).send(resp)
  })
})

app.get('*', (req, res)=>{
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

let PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
})    


