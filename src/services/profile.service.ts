import { PrismaClient, Prisma } from "@prisma/client";
import UserProfile from "../models/userProfile";

const prisma = new PrismaClient();

export const getProfileById = async (
  id: number,
): Promise<UserProfile | null> => {
  const userDb = await prisma.user.findUnique({
    where: { USEN_ID: id },
    select: {
      USEN_ID: true,
      USEC_LNAME: true,
      USEC_FNAME: true,
      USED_BIRTH: true,
      USEC_TEL: true,
      USEC_ADDRESS: true,
      USEC_URLPP: true,
      USEC_BIO: true,
    },
  });

  if (!userDb) {
    return null;
  }

  return UserProfile.fromDb(userDb);
};

export const getAllProfiles = async () => {
  const profiles = await prisma.user.findMany({
    select: {
      USEN_ID: true,
      USEC_FNAME: true,
      USEC_LNAME: true,
    },
  });

  return profiles;
};

export const updateProfileById = async (
  id: number,
  profile: UserProfile,
): Promise<UserProfile> => {
  const updated = await prisma.user.update({
    where: { USEN_ID: id },
    data: {
      USEC_FNAME: profile.getFirstName(),
      USEC_LNAME: profile.getLastName(),
      USED_BIRTH: profile.getBirthDate(),
      USEC_TEL: profile.getTel(),
      USEC_ADDRESS: profile.getAddress(),
      USEC_URLPP: profile.getPhotoUrl(),
      USEC_BIO: profile.getBio(),
    },
    select: {
      USEN_ID: true,
      USEC_FNAME: true,
      USEC_LNAME: true,
      USED_BIRTH: true,
      USEC_TEL: true,
      USEC_ADDRESS: true,
      USEC_URLPP: true,
      USEC_BIO: true,
    },
  });

  return UserProfile.fromDb(updated);
};

export const deleteProfileById = async (id: number): Promise<boolean> => {
  try {
    await prisma.user.delete({
      where: {
        USEN_ID: id,
      },
    });
    return true;
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return false;
    }
    throw error;
  }
};
