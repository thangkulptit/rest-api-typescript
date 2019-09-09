import { Router } from "express";
import { TestController } from "../controllers/front/test-controller";
import { loggerWinston } from "../lib/logger";
import { AuthenticateController } from "../controllers/authenticate-controller";

const router = Router();
// need to authorize every request 
router.use((req, res, next) => {
    const ignoreUnauthorizedPath = ['/auth'];

    if ((ignoreUnauthorizedPath.indexOf(req.path) === -1) && !req.isAuthenticated()) {
        loggerWinston.info("Authorize check first");
        var edata = {
            rcode: 401,
            msg: "Unauthorized",
        };
        loggerWinston.error("Request is Unauthorized!");
        return res.send(edata);
    }

    next();
});

router.get("/test", (req, res, next) => {
    let controller = new TestController();
    controller.proc(req, res, next);
})
router.post("/auth", (req, res, next) => {
    let controller = new AuthenticateController();
    controller.authenticate(req, res, next);
})

export const FrontRoute: Router = router