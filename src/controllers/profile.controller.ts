import { Request, Response } from "express";
import {
  getProfileById,
  getAllProfiles,
  updateProfileById,
  deleteProfileById,
} from "../services/profile.service";
import userProfile from "../models/userProfile";

export const getProfileController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = parseInt(req.params.id, 10);

    if (isNaN(userId)) {
      res.status(400).json({ error: "ID invalide" });
      return;
    }

    const profile = await getProfileById(userId);

    if (!profile) {
      res.status(404).json({ error: "Profile not found" });
      return;
    }

    res.status(200).json(profile.toJson());
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateProfileController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = parseInt(req.params.id, 10);

    if (isNaN(userId)) {
      res.status(400).json({ error: "ID invalide" });
      return;
    }

    const existingProfile = await getProfileById(userId);

    if (!existingProfile) {
      res.status(404).json({ error: "Profile not found" });
      return;
    }

    const profile = new userProfile(
      existingProfile.getId(),
      req.body.lastName,
      req.body.firstName,
      new Date(req.body.birthDate),
      req.body.tel,
      req.body.address,
      req.body.photoUrl,
      req.body.bio,
    );

    const updatedProfile = await updateProfileById(userId, profile);

    res.status(200).json(updatedProfile.toJson());
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteProfileController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = parseInt(req.params.id, 10);

    if (isNaN(userId)) {
      res.status(400).json({ error: "ID invalide" });
      return;
    }

    const isDeleted = await deleteProfileById(userId);

    if (!isDeleted) {
      res.status(404).json({ error: "Profile not found" });
      return;
    }

    res.status(200).json({ message: "Profile deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllProfilesController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const profiles = await getAllProfiles();
    if (profiles.length === 0) {
      res.status(204).send();
      return;
    }
    res.status(200).json(profiles);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
