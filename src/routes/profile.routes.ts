import { Router } from "express";
import {getProfile, updateProfile, deleteProfile, getAllProfiles} from "../controllers/profile.controller";

const router = Router();

router.get('/:id', getProfile);
router.put('/:id', updateProfile);
router.delete('/:id', deleteProfile);
router.get('/', getAllProfiles);

export default router;