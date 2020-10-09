require("dotenv").config();

const express = require("express"),
  massive = require("massive"),
  session = require("express-session"),
  { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env,
  port = SERVER_PORT,
  app = express(),
  ctrl = require("./controller");


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
app.post("/api/register", ctrl.register);
app.post("/api/login", ctrl.login);
app.get("/api/logout", ctrl.logout);

//post endpoints
// app.post("/api/post", mainCtrl.createPost);
// app.get("/api/posts/:id", mainCtrl.getUserPosts);
// app.delete("/api/post/:id", mainCtrl.deletePost);

app.listen(port, () => console.log(`Listening on port ${port}`));