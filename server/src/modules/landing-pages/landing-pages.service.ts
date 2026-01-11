import prisma from '../../config/prisma';

export const createLandingPage = async (data: any) => {
    return prisma.landingPage.create({
        data: {
            title: data.title,
            slug: data.slug,
            description: data.description ?? null,
            sections: JSON.stringify(data.sections || []),
            isActive: data.isActive ?? true
        }
    });
};

export const updateLandingPage = async (id: string, data: any) => {
    // Construct update data carefully to avoid undefined/null issues
    const updateData: any = {};
    if (data.title !== undefined) updateData.title = data.title;
    if (data.slug !== undefined) updateData.slug = data.slug;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.sections !== undefined) updateData.sections = JSON.stringify(data.sections);
    if (data.isActive !== undefined) updateData.isActive = data.isActive;

    return prisma.landingPage.update({
        where: { id },
        data: updateData
    });
};

export const getLandingPageBySlug = async (slug: string) => {
    const page = await prisma.landingPage.findUnique({
        where: { slug }
    });

    if (!page) return null;

    return {
        ...page,
        sections: JSON.parse(page.sections)
    };
};

export const getAllLandingPages = async () => {
    return prisma.landingPage.findMany({
        orderBy: { createdAt: 'desc' }
    });
};

export const deleteLandingPage = async (id: string) => {
    return prisma.landingPage.delete({
        where: { id }
    });
};
