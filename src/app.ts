import express, { Express } from "express";
import dotenv from "dotenv";
import cors from 'cors'
import cookieParser from "cookie-parser";
import morgan from "morgan";

class Server {

    private app: Express;
    private port: number;
    private frontendUrl: string;
    private corsMethods: string[];
    private authRoute: AuthRoute;

    constructor() {
        dotenv.config({
            path: ".env",
        }),
            (this.app = express());
        this.port = parseInt(process.env.PORT || "4000");
        this.frontendUrl = process.env.FRONTEND_URL as string;
        this.corsMethods = ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"];
        this.authRoute = new AuthRoute();

        this.configureMiddlewares();
        this.configuredRoute();
        this.loggerConfigs();
    }

    public configureMiddlewares(): void {
        this.app.use(express.json());
        this.app.use(cookieParser());
        this.app.use(
            cors({
                origin: this.frontendUrl,
                credentials: true,
            })
        );
    }

    public loggerConfigs(): void {
        this.app.use(morgan("dev"));
    }

    private configuredRoute(): void {
        this.app.use("/api/auth", this.authRoute.router);
    }

    public start(): void {
        this.app.listen(this.port, async (): Promise<void> => {
            console.log(
                `Server listening to port ${this.port
                } on ${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()} `
            );
        });
    }
}

const server = new Server();

server.start();
