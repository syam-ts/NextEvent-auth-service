import { Request, Response, Router } from "express";
import { verifyToken } from "../middleware/verifyToken";

class EventRoute {

    public router: Router;

    constructor() {
        this.router = Router(); 
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.get("/verify", verifyToken, (req: Request, res: Response) => {
            if (!req.user) throw new Error("User not found");
            res.json({
                _id: req.user._id,
                role: req.user.role,
            });
        });
    }
}

export default EventRoute;
