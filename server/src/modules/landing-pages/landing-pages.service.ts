import prisma from '../../config/prisma';

export const createLandingPage = async (data: {
    title: string;
    slug: string;
    description?: string;
    sections: any[];
    isActive?: boolean;
}) => {
    return prisma.landingPage.create({
        data: {
            title: data.title,
            slug: data.slug,
            description: data.description,
            sections: JSON.stringify(data.sections),
            isActive: data.isActive ?? true
        }
    });
};

export const updateLandingPage = async (id: string, data: {
    title?: string;
    slug?: string;
    description?: string;
    sections?: any[];
    isActive?: boolean;
}) => {
    return prisma.landingPage.update({
        where: { id },
        data: {
            ...data,
            sections: data.sections ? JSON.stringify(data.sections) : undefined
        }
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
