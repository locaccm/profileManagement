import { Router } from "express";
import {
    getProfileController,
    updateProfileController,
    deleteProfileController,
    getAllProfilesController,
} from "../controllers/profile.controller";
import {validateProfileInput} from "../middlewares/validateProfile";

const router = Router();

router.get('/:id', getProfileController);
router.put('/:id', validateProfileInput, updateProfileController);
router.delete('/:id', deleteProfileController);
router.get('/', getAllProfilesController);

export default router;