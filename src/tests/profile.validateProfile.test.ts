import { validateProfileInput } from "../middlewares/validateProfile";
import { Request, Response, NextFunction } from "express";

describe("Middleware - validateProfileInput", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      body: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it("should call next() when all required fields are present", () => {
    req.body = {
      firstName: "Jean",
      lastName: "Dupont",
      birthDate: "1990-01-01",
      address: "123 rue Test",
    };

    validateProfileInput(req as Request, res as Response, next);
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });

  it("should return 400 if firstName is missing", () => {
    req.body = {
      lastName: "Dupont",
      birthDate: "1990-01-01",
      address: "123 rue Test",
    };

    validateProfileInput(req as Request, res as Response, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Missing or invalid required fields.",
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("should return 400 if all required fields are missing", () => {
    validateProfileInput(req as Request, res as Response, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Missing or invalid required fields.",
    });
    expect(next).not.toHaveBeenCalled();
  });
});
