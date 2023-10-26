import express from "express";
import * as authController from "./controller/auth.controller";
import * as uploadController from "./controller/upload.controller";
import * as userController from "./controller/user.controller";
import { connectDB } from "./db";
import session from "express-session";
import cookieParser from "cookie-parser";
import cors from 'cors';
import path from "path";
import jwtSessionMiddleware from "./middleware/jwt-session";

const corsOptions: cors.CorsOptions = {
  origin: 'http://localhost:4200',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
const app: express.Express = express();
const port: number = 3000;
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: "auth-template",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);
app.use(cors(corsOptions));
app.use('/public', express.static(path.join(__dirname, 'public')));

app.post("/sign-up", authController.signUp);
app.post("/sign-in", authController.signIn);
app.post("/upload", uploadController.fileUpload);
app.get("/user", jwtSessionMiddleware, userController.getUserByToken);

app.listen(port, () => {
  connectDB();
  console.log(`Server is running on http://localhost:${port}`);
});
