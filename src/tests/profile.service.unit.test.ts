import {
    getProfileById,
    getAllProfiles,
    updateProfileById,
    deleteProfileById,
} from "../services/profile.service";
import UserProfile from "../models/userProfile";

jest.mock("@prisma/client", () => {
    const mUser = {
        findUnique: jest.fn(),
        findMany: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    };
    return {
        PrismaClient: jest.fn(() => ({
            user: mUser,
        })),
    };
});

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

describe("Profile Service - UNIT", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("getProfileById", () => {
        it("should return null for non-existing ID", async () => {
            prisma.user.findUnique.mockResolvedValue(null);

            const result = await getProfileById(9999);
            expect(result).toBeNull();
        });

        it("should return a UserProfile object for existing ID", async () => {
            prisma.user.findUnique.mockResolvedValue({
                USEN_ID: 1,
                USEC_FNAME: "Maxime",
                USEC_LNAME: "Test",
                USED_BIRTH: new Date("1990-01-01"),
                USEC_TEL: "0600000000",
                USEC_ADDRESS: "1 rue test",
                USEC_URLPP: "https://example.com",
                USEC_BIO: "Bio",
            });

            const result = await getProfileById(1);
            expect(result).toBeInstanceOf(UserProfile);
            expect(result?.getFirstName()).toBe("Maxime");
        });
    });

    describe("getAllProfiles", () => {
        it("should return an array of profiles", async () => {
            prisma.user.findMany.mockResolvedValue([
                { USEN_ID: 1, USEC_FNAME: "Alice", USEC_LNAME: "Smith" },
                { USEN_ID: 2, USEC_FNAME: "Bob", USEC_LNAME: "Johnson" },
            ]);

            const result = await getAllProfiles();
            expect(Array.isArray(result)).toBe(true);
            expect(result).toHaveLength(2);
        });
    });

    describe("updateProfileById", () => {
        it("should update and return a UserProfile", async () => {
            const profile = new UserProfile(1)
                .setFirstName("Updated")
                .setLastName("User");

            prisma.user.update.mockResolvedValue({
                USEN_ID: 1,
                USEC_FNAME: "Updated",
                USEC_LNAME: "User",
                USED_BIRTH: null,
                USEC_TEL: null,
                USEC_ADDRESS: null,
                USEC_URLPP: null,
                USEC_BIO: null,
            });

            const result = await updateProfileById(1, profile);
            expect(result.getFirstName()).toBe("Updated");
        });
    });

    describe("deleteProfileById", () => {
        it("should return true on successful deletion", async () => {
            prisma.user.delete.mockResolvedValue({});
            const result = await deleteProfileById(1);
            expect(result).toBe(true);
        });

        it("should return false when deletion fails", async () => {
            prisma.user.delete.mockRejectedValue(new Error("not found"));
            const result = await deleteProfileById(999);
            expect(result).toBe(false);
        });
    });
});
