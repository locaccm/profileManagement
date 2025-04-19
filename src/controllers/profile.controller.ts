import { Request, Response } from "express";
import {clearProfileById, getProfileById, getAllProfiles, updateProfileById} from "../services/profile.service";


export const getProfileController = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.id, 10);

        if (isNaN(userId)) {
            return res.status(400).json({ error: 'ID invalide' });
        }

        const profile = await getProfileById(userId);

        if (!profile) {
            return res.status(404).json({ error: 'Profile not found' });
        }

        return res.status(200).json(profile);
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

export const updateProfileController = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.id, 10);

        if (isNaN(userId)) {
            return res.status(400).json({ error: 'ID invalide' });
        }

        const profile = await getProfileById(userId);

        if (!profile) {
            return res.status(404).json({ error: 'Profile not found' });
        }

        const updateData: ProfileUpdateInput = {
            photoUrl: req.body.userUrlPp,
            lastName: req.body.userLastName,
            firstName: req.body.userFirstName,
            bio: req.body.userBio,
            birthDate: req.body.userBirth,
            tel: req.body.userTel,
            address: req.body.userAddress,
            email: req.body.userEmail,
        };

        const profileUpdated = await updateProfileById(userId, updateData);

        return res.status(200).json(profileUpdated);
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

export const deleteProfileController = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.id, 10);

        if (isNaN(userId)) {
            return res.status(400).json({ error: 'ID invalide' });
        }

        const profile = await clearProfileById(userId);

        if (!profile) {
            return res.status(404).json({ error: 'Profile not found' });
        }

        return res.status(200).json(profile);
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getAllProfilesController  = async (req: Request, res: Response) => {
    try {
        const profiles = await getAllProfiles();
        if (profiles.length === 0) {
            return res.status(204).send();
        }
        return res.status(200).json(profiles);
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}
