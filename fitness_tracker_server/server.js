const express = require("express");
const cookieParser = require("cookie-parser");
const DBconnection = require("./utils/dbConnection");
const cors = require("cors");
const cron=require('./utils/cron');
const router = require("./routes/user");
const app = express();
const port = 4000;
const nutritionRoutes = require("./routes/nutrition");
const workoutRoutes = require("./routes/workout");
DBconnection();

app.use(cookieParser());
app.use(
  cors({
    
    origin: "http://localhost:3000", 
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/user/v1", router);
app.use("/api/v1", nutritionRoutes);
app.use("/api/v1", workoutRoutes);



cron()
app.listen(port, () => {
  console.log(`Server Listen At Port ${port}`);
});
