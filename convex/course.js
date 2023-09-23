import { mutation, query } from "./_generated/server";
import { v } from "convex/values";


export const createCourse = mutation({
    args: { title: v.string(), description: v.string() },
    handler: async (ctx, args) => {

        const course = await ctx.db.insert('course', {
            title: args.title,
            description: args.description
        });
        return course;
    }
});

export const getCourse = query({
    args: { courseId: v.id("course") },
    handler: async (ctx, args) => {
        const course = await ctx.db.get('course', args.courseId);

        return course;
    }
});

export const createCourseAccess = mutation({
    args: {
        courseId: v.string(), userPermissions: v.object(
            { property: v.number() }
        )
    },
    handler: async (ctx, args) => {
        await ctx.db.insert('courseAccess', {
            course: args.courseId,
            permissions: args.userPermissions
        })
    }
});

export const updateCourseAccess = mutation({
    args: { courseAccessId: v.id("courseAccess"), userPermissions: v.object({ property: v.number() }) },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.id, args.userPermissions)
    }
});