import {
    getProfileController,
    updateProfileController,
    deleteProfileController,
    getAllProfilesController,
} from "../controllers/profile.controller";
import * as profileService from "../services/profile.service";
import { Request, Response } from "express";
import UserProfile from "../models/userProfile";

jest.mock("../services/profile.service");

describe("Profile Controller - UNIT", () => {
    let req: Partial<Request>;
    let res: Partial<Response>;

    beforeEach(() => {
        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn(),
        };
    });

    describe("getProfileController", () => {
        it("should return 200 and profile JSON", async () => {
            req.params = { id: "1" };
            const profile = new UserProfile(1).setFirstName("Test");
            jest.spyOn(profileService, "getProfileById").mockResolvedValue(profile);

            await getProfileController(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(profile.toJson());
        });

        it("should return 404 if profile not found", async () => {
            req.params = { id: "999" };
            jest.spyOn(profileService, "getProfileById").mockResolvedValue(null);

            await getProfileController(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: "Profile not found" });
        });

        it("should return 400 for invalid ID", async () => {
            req.params = { id: "abc" };

            await getProfileController(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: "ID invalide" });
        });
    });

    describe("updateProfileController", () => {
        it("should return 404 if profile to update is not found", async () => {
            req.params = { id: "2" };
            req.body = {
                firstName: "John",
                lastName: "Doe",
                birthDate: "1990-01-01",
                tel: "0600000000",
                address: "123 rue Test",
                photoUrl: "",
                bio: "",
            };

            jest.spyOn(profileService, "getProfileById").mockResolvedValue(null);

            await updateProfileController(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: "Profile not found" });
        });
    });

    describe("deleteProfileController", () => {
        it("should return 200 if profile is deleted", async () => {
            req.params = { id: "1" };
            jest.spyOn(profileService, "deleteProfileById").mockResolvedValue(true);

            await deleteProfileController(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: "Profile deleted successfully" });
        });

        it("should return 404 if profile not found", async () => {
            req.params = { id: "999" };
            jest.spyOn(profileService, "deleteProfileById").mockResolvedValue(false);

            await deleteProfileController(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: "Profile not found" });
        });

        it("should return 400 for invalid ID", async () => {
            req.params = { id: "bad" };

            await deleteProfileController(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: "ID invalide" });
        });
    });

    describe("getAllProfilesController", () => {
        it("should return 200 with profiles", async () => {
            jest.spyOn(profileService, "getAllProfiles").mockResolvedValue([
                { USEN_ID: 1, USEC_FNAME: "Jean", USEC_LNAME: "Dupont" },
            ]);

            await getAllProfilesController(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith([
                { USEN_ID: 1, USEC_FNAME: "Jean", USEC_LNAME: "Dupont" },
            ]);
        });

        it("should return 204 if no profiles", async () => {
            jest.spyOn(profileService, "getAllProfiles").mockResolvedValue([]);

            await getAllProfilesController(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(204);
            expect(res.send).toHaveBeenCalled();
        });
    });
});
