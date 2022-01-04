"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const requests_1 = __importDefault(require("./routes/requests"));
class Server {
    constructor(port) {
        this.loadRepos = () => __awaiter(this, void 0, void 0, function* () {
            /** Repos **/
            //Repo.loadLocalMind("x");
        });
        this.startServer = () => __awaiter(this, void 0, void 0, function* () {
            let that = this;
            return new Promise(function (resolve, rejected) {
                var _a;
                const httpServer = http_1.default.createServer(that.router);
                const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : that.port;
                httpServer.listen(PORT, () => {
                    console.log(`The server is running on port ${PORT}`);
                    resolve("oks");
                });
            });
        });
        this.port = port;
        this.router = (0, express_1.default)();
        /** Logging */
        this.router.use((0, morgan_1.default)("dev"));
        /** Parse the request */
        this.router.use(express_1.default.urlencoded({ extended: false }));
        /** Takes care of JSON data */
        //router.use(express.json());
        this.router.use(express_1.default.json({ limit: "50mb" }));
        this.router.use(express_1.default.urlencoded({
            limit: "50mb",
            extended: true,
            parameterLimit: 50000,
        }));
        /** RULES OF OUR API */
        this.router.use((req, res, next) => {
            // set the CORS policy
            res.header("Access-Control-Allow-Origin", "*");
            // set the CORS headers
            res.header("Access-Control-Allow-Headers", "origin, X-Requested-With,Content-Type,Accept, Authorization");
            // set the CORS method headers
            if (req.method === "OPTIONS") {
                res.header("Access-Control-Allow-Methods", "GET PATCH DELETE POST");
                return res.status(200).json({});
            }
            next();
        });
        /** Routes */
        this.router.use("/", requests_1.default);
        /** Error handling */
        this.router.use((req, res, next) => {
            const error = new Error("not found");
            return res.status(404).json({
                message: error.message,
            });
        });
    }
}
exports.Server = Server;
