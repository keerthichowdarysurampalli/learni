import { defineTable, defineSchema } from 'convex/server';
import { v } from 'convex/values';


export default defineSchema({
    course: defineTable({
        title: v.string(),
        description: v.string(),
        instructorIdList: v.array(v.string()),
        moderatorIdList: v.array(v.string()),
        studentIdList: v.array(v.string()),
        seats: v.number(),
        seatsAvailable: v.number(),
        courseStartDate: v.string(),
        courseEndDate: v.string(),
        eventList: v.array(v.string()),
        temp: v.string(),
    }),
    courseAccess: defineTable({
        course: v.id("course"),
        permissions: v.object(
            v.id('user'), {
            permission: v.number(),
        }
        ),
    }),

    user: defineTable({
        username: v.string(),
        firstName: v.string(),
        lastName: v.string(),
        email: v.string(),
        phoneNumber: v.string(),
        address: {
            street: v.string(),
            city: v.string(),
            state: v.string(),
            zip: v.string(),
            country: v.string(),
        },
        dateOfBirth: v.string(),
        emergencyContacts: v.array({
            name: v.string(),
            phoneNumber: v.string(),
            email: v.string(),
        },)
    }),

    courseContent: defineTable({
        title: v.string(),

    }),

});