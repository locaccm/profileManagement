import { Router } from "express";
import {
  getProfileController,
  updateProfileController,
  deleteProfileController,
  getAllProfilesController,
} from "../controllers/profile.controller";
import { validateProfileInput } from "../middlewares/validateProfile";

const router = Router();

/**
 * @swagger
 * /profiles/{id}:
 *   get:
 *     summary: Récupérer un profil par ID
 *     tags: [Profiles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Profil récupéré avec succès
 *       400:
 *         description: ID invalide
 *       404:
 *         description: Profil non trouvé
 */
router.get("/:id", getProfileController);

/**
 * @swagger
 * /profiles/{id}:
 *   put:
 *     summary: Mettre à jour un profil existant
 *     tags: [Profiles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - birthDate
 *               - address
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: Jean
 *               lastName:
 *                 type: string
 *                 example: Dupont
 *               birthDate:
 *                 type: string
 *                 format: date
 *                 example: 1990-05-20
 *               tel:
 *                 type: string
 *                 example: "0601020304"
 *               address:
 *                 type: string
 *                 example: "123 Rue des Lilas, Paris"
 *               photoUrl:
 *                 type: string
 *                 example: "https://example.com/photo.jpg"
 *               bio:
 *                 type: string
 *                 example: "Propriétaire passionné"
 *     responses:
 *       200:
 *         description: Profil mis à jour avec succès
 *       400:
 *         description: Données invalides
 *       404:
 *         description: Profil non trouvé
 */
router.put("/:id", validateProfileInput, updateProfileController);

/**
 * @swagger
 * /profiles/{id}:
 *   delete:
 *     summary: Supprimer un profil par ID
 *     tags: [Profiles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Profil supprimé avec succès
 *       400:
 *         description: ID invalide
 *       404:
 *         description: Profil non trouvé
 */
router.delete("/:id", deleteProfileController);

/**
 * @swagger
 * /profiles:
 *   get:
 *     summary: Récupérer la liste de tous les profils
 *     tags: [Profiles]
 *     responses:
 *       200:
 *         description: Liste des profils récupérée avec succès
 *       204:
 *         description: Aucun profil trouvé
 */
router.get("/", getAllProfilesController);

export default router;
