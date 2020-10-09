require("dotenv").config();
const express = require("express"),
  massive = require("massive"),
  session = require("express-session"),
  ctrl = require("./controller"),
  { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env,
  app = express();

app.use(express.json());

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 365 },
  })
);

massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false },
}).then((db) => {
  app.set("db", db);
  console.log("db connected");
});

//auth endpoints
app.post("/api/register", ctrl.register)
app.post("/api/login", ctrl.login)
app.get("/api/logout", ctrl.logout)

//post endpoints
app.get('/api/posts/:userid',)
app.post('/api/post/:userid',)
app.get('/api/post/:postid', )

// app.post("/api/post", ctrl.createPost);
// app.get("/api/posts/:id", ctrl.getUserPosts);
// app.delete("/api/post/:id", ctrl.deletePost);

app.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}`));