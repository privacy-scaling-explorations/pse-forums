import { Request, Response } from "express";
import { BadgesService } from "./badges.service";

export class BadgesController {
  private badgesService: BadgesService;

  constructor() {
    this.badgesService = new BadgesService();
  }

  getAllBadges = async (req: Request, res: Response) => {
    try {
      const badges = await this.badgesService.getAllBadges();
      return res.status(200).json(badges);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch badges" });
    }
  };

  getBadgeById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const badge = await this.badgesService.getBadgeById(id);
      
      if (!badge) {
        return res.status(404).json({ error: "Badge not found" });
      }

      return res.status(200).json(badge);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch badge" });
    }
  };
} 