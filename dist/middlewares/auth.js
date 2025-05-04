var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
export const Auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = req.cookies.access_token || ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1]);
        if (!token) {
            res.status(401).json({
                message: "Unauthorized",
                statusCode: 401,
            });
            return;
        }
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
        if (typeof decoded !== "object" || !("userId" in decoded)) {
            res.status(401).json({
                message: "Unauthorized",
                statusCode: 401,
            });
            return;
        }
        const user = yield User.findById(decoded.userId);
        if (!user) {
            res.status(401).json({
                message: "Unauthorized",
                statusCode: 401,
            });
            return;
        }
        req.user = user;
        next();
    }
    catch (error) {
        console.error(error);
        res.status(401).json({
            message: "Invalid or expired token",
            statusCode: 401,
        });
    }
});
export default Auth;
