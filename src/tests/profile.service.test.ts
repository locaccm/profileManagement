import { PrismaClient } from "@prisma/client";
import {
  getProfileById,
  getAllProfiles,
  updateProfileById,
  deleteProfileById,
} from "../services/profile.service";

import UserProfile from "../models/userProfile";
const prisma = new PrismaClient();

beforeAll(async () => {
  await prisma.user.create({
    data: {
      USEN_ID: 1,
      USEC_FNAME: "Maxime",
      USEC_LNAME: "Test",
      USED_BIRTH: new Date("1990-01-01"),
      USEC_TEL: "0600000000",
      USEC_ADDRESS: "1 Rue de Paris",
      USEC_URLPP: "https://example.com/photo.jpg",
      USEC_BIO: "Test bio",
    },
  });
});

afterAll(async () => {
  await prisma.user.deleteMany();
  await prisma.$disconnect();
});

describe("Profile Service", () => {
  // GET BY ID
  describe("getProfileById", () => {
    it("should return null for a non-existing ID", async () => {
      const result = await getProfileById(999999);
      expect(result).toBeNull();
    });

    it("should return a valid profile for existing ID", async () => {
      const result = await getProfileById(1);
      expect(result).not.toBeNull();
      expect(result?.getFirstName()).toBeDefined();
    });
  });

  // GET ALL
  describe("getAllProfiles", () => {
    it("should return an array", async () => {
      const profiles = await getAllProfiles();
      expect(Array.isArray(profiles)).toBe(true);
    });
  });

  // UPDATE PROFILE
  describe("updateProfileById", () => {
    it("should update a profile correctly", async () => {
      const existing = await getProfileById(1); // ID existant requis

      if (!existing) {
        return;
      }

      existing.setFirstName("TestName");

      const updated = await updateProfileById(existing.getId(), existing);
      expect(updated.getFirstName()).toBe("TestName");
    });
  });

  // DELETE PROFILE
  describe("deleteProfileById", () => {
    it("should return false when trying to delete a non-existing user", async () => {
      const result = await deleteProfileById(999999);
      expect(result).toBe(false);
    });
  });
});
