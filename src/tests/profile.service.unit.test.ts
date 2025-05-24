import {
  getProfileById,
  getAllProfiles,
  updateProfileById,
  deleteProfileById,
} from "../services/profile.service";
import UserProfile from "../models/userProfile";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

// On mock prisma dans le service
jest.mock("@prisma/client", () => {
  const actualPrisma = jest.requireActual("@prisma/client");
  return {
    ...actualPrisma,
    PrismaClient: jest.fn().mockImplementation(() => ({
      user: {
        findUnique: jest.fn(),
        findMany: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
    })),
  };
});

const { PrismaClient } = require("@prisma/client");
const prismaMock = new PrismaClient();

describe("Profile Service - UNIT", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getProfileById", () => {
    it("should return null for non-existing ID", async () => {
      prismaMock.user.findUnique.mockResolvedValue(null);

      const result = await getProfileById(1234);
      expect(result).toBeNull();
    });

    it("should return profile for valid ID", async () => {
      const mockUser = {
        USEN_ID: 1,
        USEC_FNAME: "Maxime",
        USEC_LNAME: "Cauwet",
        USED_BIRTH: new Date("1990-01-01"),
        USEC_TEL: "0601020304",
        USEC_ADDRESS: "123 rue test",
        USEC_URLPP: "https://image.url",
        USEC_BIO: "bio test",
      };

      prismaMock.user.findUnique.mockResolvedValue(mockUser);

      const result = await getProfileById(1);
      expect(result).not.toBeNull();
      expect(result?.getFirstName()).toBe("Maxime");
    });
  });

  describe("getAllProfiles", () => {
    it("should return a list of profiles", async () => {
      prismaMock.user.findMany.mockResolvedValue([
        { USEN_ID: 1, USEC_FNAME: "Test", USEC_LNAME: "User" },
      ]);

      const result = await getAllProfiles();
      expect(Array.isArray(result)).toBe(true);
      expect(result[0].USEN_ID).toBe(1);
    });
  });

  describe("updateProfileById", () => {
    it("should update and return the user profile", async () => {
      const profile = new UserProfile(1)
        .setFirstName("Jean")
        .setLastName("Dupont")
        .setBirthDate(new Date("1995-05-20"))
        .setAddress("Paris")
        .setTel("0600000000")
        .setPhotoUrl("https://photo.jpg")
        .setBio("bio");

      const updatedUser = {
        USEN_ID: 1,
        USEC_FNAME: "Jean",
        USEC_LNAME: "Dupont",
        USED_BIRTH: new Date("1995-05-20"),
        USEC_TEL: "0600000000",
        USEC_ADDRESS: "Paris",
        USEC_URLPP: "https://photo.jpg",
        USEC_BIO: "bio",
      };

      prismaMock.user.update.mockResolvedValue(updatedUser);

      const result = await updateProfileById(1, profile);
      expect(result.getFirstName()).toBe("Jean");
    });
  });

  describe("deleteProfileById", () => {
    it("should return true when deletion is successful", async () => {
      prismaMock.user.delete.mockResolvedValue({});

      const result = await deleteProfileById(1);
      expect(result).toBe(true);
    });

    it("should return false when deletion fails with P2025", async () => {
      prismaMock.user.delete.mockRejectedValue(
        new PrismaClientKnownRequestError("Record to delete does not exist.", {
          code: "P2025",
        } as any),
      );

      const result = await deleteProfileById(9999);
      expect(result).toBe(false);
    });

    it("should throw error for unexpected error", async () => {
      prismaMock.user.delete.mockRejectedValue(new Error("Unexpected"));

      await expect(deleteProfileById(123)).rejects.toThrow("Unexpected");
    });
  });
});
