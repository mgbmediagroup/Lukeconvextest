import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  messages: defineTable({
    name: v.string(),
    email: v.string(),
    subject: v.optional(v.string()),
    message: v.string(),
    createdAt: v.number(),
    status: v.union(v.literal("pending"), v.literal("sent"), v.literal("failed")),
  }),
  
  subscribers: defineTable({
    email: v.string(),
    name: v.optional(v.string()),
    subscribedAt: v.number(),
    isActive: v.boolean(),
  }).index("by_email", ["email"]),
});