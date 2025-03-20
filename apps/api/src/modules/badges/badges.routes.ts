import { Router } from "express";
import { BadgesController } from "./badges.controller";

const router = Router();
const badgesController = new BadgesController();

router.get("/", badgesController.getAllBadges);
router.get("/:id", badgesController.getBadgeById);

export { router as badgesRouter }; 