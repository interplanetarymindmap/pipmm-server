import http from "http";
import express, { Express } from "express";
import morgan from "morgan";
import routes from "./routes/requests";
import { toUSVString } from "util";

export class Server {
  port: Number;
  router: Express;

  constructor(port: Number) {
    this.port = port;

    this.router = express();

    /** Logging */
    this.router.use(morgan("dev"));
    /** Parse the request */
    this.router.use(express.urlencoded({ extended: false }));
    /** Takes care of JSON data */
    //router.use(express.json());
    this.router.use(express.json({ limit: "50mb" }));

    /** RULES OF OUR API */
    this.router.use((req, res, next) => {
      // set the CORS policy
      res.header("Access-Control-Allow-Origin", "*");
      // set the CORS headers
      res.header(
        "Access-Control-Allow-Headers",
        "origin, X-Requested-With,Content-Type,Accept, Authorization"
      );
      // set the CORS method headers
      if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "GET PATCH DELETE POST");
        return res.status(200).json({});
      }
      next();
    });

    /** Routes */
    this.router.use("/", routes);

    /** Error handling */
    this.router.use((req, res, next) => {
      const error = new Error("not found");
      return res.status(404).json({
        message: error.message,
      });
    });
  }

  loadRepos = async () => {
    /** Repos **/
    //Repo.loadLocalMind("x");
  };

  startServer = async () => {
    let that = this;
    return new Promise(function (resolve, rejected) {
      const httpServer = http.createServer(that.router);
      const PORT: any = process.env.PORT ?? that.port;
      httpServer.listen(PORT, () => {
        console.log(`The server is running on port ${PORT}`);
        resolve("oks");
      });
    });
  };
}
