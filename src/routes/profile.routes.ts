import { Router } from "express";
import {
  getProfileController,
  updateProfileController,
  deleteProfileController,
  getAllProfilesController,
} from "../controllers/profile.controller";
import { validateProfileInput } from "../middlewares/validateProfile";
import { checkAccess } from "../middlewares/checkAcces";

const router = Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Profile:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 999
 *         firstName:
 *           type: string
 *           example: Maxime
 *         lastName:
 *           type: string
 *           example: Test
 *         birthDate:
 *           type: string
 *           format: date
 *           example: 1990-01-01
 *         tel:
 *           type: string
 *           example: "0600000000"
 *         address:
 *           type: string
 *           example: "1 Rue de Paris"
 *         photoUrl:
 *           type: string
 *           example: "https://example.com/photo.jpg"
 *         bio:
 *           type: string
 *           example: "Test bio"
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           example: "Profil non trouvé"
 */

/**
 * @swagger
 * /profiles/{id}:
 *   get:
 *     summary: Récupérer un profil par ID
 *     operationId: getProfileById
 *     tags: [Profiles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 999
 *     responses:
 *       200:
 *         description: Profil récupéré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profile'
 *       400:
 *         description: ID invalide
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Profil non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/:id", checkAccess("getProfile"), getProfileController);

/**
 * @swagger
 * /profiles/{id}:
 *   put:
 *     summary: Mettre à jour un profil existant
 *     operationId: updateProfileById
 *     tags: [Profiles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
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
 *               lastName:
 *                 type: string
 *               birthDate:
 *                 type: string
 *                 format: date
 *               tel:
 *                 type: string
 *               address:
 *                 type: string
 *               photoUrl:
 *                 type: string
 *               bio:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profil mis à jour
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profile'
 *       400:
 *         description: Requête invalide
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Profil non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.put(
  "/:id",
  checkAccess("updateProfile"),
  validateProfileInput,
  updateProfileController,
);

/**
 * @swagger
 * /profiles/{id}:
 *   delete:
 *     summary: Supprimer un profil par ID
 *     operationId: deleteProfileById
 *     tags: [Profiles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Profil supprimé avec succès
 *       400:
 *         description: ID invalide
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Profil non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.delete("/:id", checkAccess("deleteProfile"), deleteProfileController);

/**
 * @swagger
 * /profiles:
 *   get:
 *     summary: Récupérer la liste de tous les profils
 *     operationId: getAllProfiles
 *     tags: [Profiles]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des profils
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Profile'
 *       204:
 *         description: Aucun profil trouvé
 */
router.get("/", checkAccess("getProfiles"), getAllProfilesController);

export default router;
