import prisma from "./prismaClient.js";

class ProfileRepo {
    async getAll() {
        return await prisma.profile.findMany({
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        firstname: true,
                        lastname: true,
                        email: true,
                    },
                },
            },
            orderBy: { id: "asc" },
        });
    }

    async getById(id) {
        return await prisma.profile.findUnique({
            where: { id: Number(id) },
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        firstname: true,
                        lastname: true,
                        email: true,
                    },
                },
            },
        });
    }

    async create(data) {
        if (!data.userId || !data.bio) {
            throw new Error("userId and bio are required");
        }

        return await prisma.profile.create({
            data: {
                bio: data.bio,
                userId: data.userId,
            },
        });
    }

    async update(id, data) {
        return await prisma.profile.update({
            where: { id: Number(id) },
            data: {
                bio: data.bio,
            },
        });
    }

    async delete(id) {
        return await prisma.profile.delete({
            where: { id: Number(id) },
        });
    }

    async getByUsername(username) {
        return await prisma.profile.findFirst({
            where: {
                user: {
                    username,
                },
            },
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        firstname: true,
                        lastname: true,
                        email: true,
                    },
                },
            },
        });
    }
}

export default new ProfileRepo();