import { Request, Response, NextFunction } from "express";
import { checkAccess } from "../middlewares/checkAcces";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Middleware - checkAccess", () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: NextFunction;

    beforeEach(() => {
        req = {
            headers: {},
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        next = jest.fn();
    });

    it("should skip access check if AUTH_SERVICE_URL is not defined", async () => {
        delete process.env.AUTH_SERVICE_URL;

        const middleware = checkAccess("getProfile");
        await middleware(req as Request, res as Response, next);

        expect(next).toHaveBeenCalled();
    });

    it("should return 401 if token is missing", async () => {
        process.env.AUTH_SERVICE_URL = "http://fake-auth-service";

        const middleware = checkAccess("getProfile");
        await middleware(req as Request, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ error: "Missing token" });
    });

    it("should allow access if token is valid", async () => {
        process.env.AUTH_SERVICE_URL = "http://fake-auth-service";
        req.headers = {
            authorization: "Bearer valid-token",
        };

        mockedAxios.post.mockResolvedValue({ status: 201 });

        const middleware = checkAccess("getProfile");
        await middleware(req as Request, res as Response, next);

        expect(mockedAxios.post).toHaveBeenCalledWith(
            "http://fake-auth-service/access/check",
            { token: "valid-token", rightName: "getProfile" }
        );
        expect(next).toHaveBeenCalled();
    });

    it("should return 403 if access is denied", async () => {
        process.env.AUTH_SERVICE_URL = "http://fake-auth-service";
        req.headers = {
            authorization: "Bearer invalid-token",
        };

        mockedAxios.post.mockResolvedValue({ status: 403 });

        const middleware = checkAccess("getProfile");
        await middleware(req as Request, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalledWith({ error: "Access denied" });
    });

    it("should return 401 if axios throws", async () => {
        process.env.AUTH_SERVICE_URL = "http://fake-auth-service";
        req.headers = {
            authorization: "Bearer any-token",
        };

        mockedAxios.post.mockRejectedValue(new Error("Auth down"));

        const middleware = checkAccess("getProfile");
        await middleware(req as Request, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({
            error: "Authorization failed",
            details: "Auth down",
        });
    });
});
