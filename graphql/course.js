const { gql } = require("apollo-server");
const { validateJWT } = require("../helpers/generate_jwt");
const Course = require("../models/Course");

const courseTypeDefs = gql`
    extend type Query {
        courses: [Course]
    }

    type Course {
        id: ID!
        nameCourse: String!
        available: Boolean!
    }

    extend type Mutation {
        addCourse(input: CourseInput): String
        editCourse(input: CourseEdit): String
        deleteCourse(input: ID): String
    }

    input CourseInput {
        nameCourse: String!
    }

    input CourseEdit {
        id: ID!
        nameCourse: String!
    }
`;

const courseResolvers = {
    Query: {
        courses: async () => {
            try {
                const allCourses = await Course.find({
                    available: true
                });

                return allCourses;
            } catch (error) {
                throw new Error(error);
            }
        },
    },
    Mutation: {
        addCourse: async (_, { input }, { token }) => {
            const { nameCourse } = input;
            validateJWT(token);

            try {

                await Course.create({
                    nameCourse,
                });
                return "course added succesfully";

            } catch (error) {
                throw new Error(error);
            }
        },
        editCourse: async(_, { input }, { token }) => {
            const { id, nameCourse } = input;
            validateJWT(token);

            try {
                const courseEdit = await Course.findById(id);

                if(!courseEdit) {
                    throw new Error("No course was found with that id");
                }

                await courseEdit.updateOne({
                    nameCourse
                });

                return "Course edited successfuly";

            } catch (error) {
                throw new Error(error);
            }
        },
        deleteCourse: async(_, { input:id }, { token }) => {
            validateJWT(token);
            try {
                const courseDeleted = await Course.findById(id);

                if(!courseDeleted) {
                    throw new Error("Course not found")
                }

                await courseDeleted.updateOne({
                    available: false
                });
                return "Course deleted";

            } catch (error) {
                throw new Error(error);
            }
        }
    },
};

module.exports = {
    courseResolvers,
    courseTypeDefs,
};
