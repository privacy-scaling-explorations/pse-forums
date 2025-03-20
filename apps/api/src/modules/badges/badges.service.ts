import { BadgeSchema } from "@shared/schemas/badge.schema";
import { badgesMocks } from "@shared/mocks/badges.mocks";

export class BadgesService {
  private badges: BadgeSchema[] = [];

  async getAllBadges(): Promise<BadgeSchema[]> {
    return badgesMocks;
  }

  async getBadgeById(id: string): Promise<BadgeSchema | undefined> {
    return this.badges.find(badge => badge.id === id);
  }
} 