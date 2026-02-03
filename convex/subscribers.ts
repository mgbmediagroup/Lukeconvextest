import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
  args: {
    email: v.string(),
    name: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Check if email already exists
    const existing = await ctx.db
      .query("subscribers")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (existing) {
      if (!existing.isActive) {
        // Reactivate existing subscriber
        await ctx.db.patch(existing._id, {
          isActive: true,
          name: args.name || existing.name,
        });
        return existing._id;
      } else {
        throw new Error("Email already subscribed");
      }
    }

    // Create new subscriber
    const subscriberId = await ctx.db.insert("subscribers", {
      email: args.email,
      name: args.name,
      subscribedAt: Date.now(),
      isActive: true,
    });

    return subscriberId;
  },
});

export const list = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("subscribers")
      .filter((q) => q.eq(q.field("isActive"), true))
      .order("desc")
      .collect();
  },
});

export const unsubscribe = mutation({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const subscriber = await ctx.db
      .query("subscribers")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (subscriber) {
      await ctx.db.patch(subscriber._id, { isActive: false });
    }
  },
});