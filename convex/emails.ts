import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Simple functions that don't require Node.js runtime
export const getMessages = query({
  handler: async (ctx) => {
    return await ctx.db.query("messages").order("desc").collect();
  },
});

export const updateMessageStatus = mutation({
  args: {
    id: v.id("messages"),
    status: v.union(v.literal("pending"), v.literal("sent"), v.literal("failed")),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { status: args.status });
  },
});