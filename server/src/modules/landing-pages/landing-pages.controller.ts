import { Request, Response } from 'express';
import * as LandingPagesService from './landing-pages.service';

export const getPage = async (req: Request, res: Response) => {
    try {
        const { slug } = req.params;
        if (!slug) return res.status(400).json({ message: 'Slug is required' });

        const page = await LandingPagesService.getLandingPageBySlug(slug);

        if (!page) {
            return res.status(404).json({ message: 'Page not found' });
        }

        if (!page.isActive) {
            return res.status(404).json({ message: 'Page is not active' });
        }

        res.json(page);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const listPages = async (req: Request, res: Response) => {
    try {
        const pages = await LandingPagesService.getAllLandingPages();
        res.json(pages);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const createPage = async (req: Request, res: Response) => {
    try {
        const page = await LandingPagesService.createLandingPage(req.body);
        res.json(page);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const updatePage = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ message: 'ID is required' });

        const page = await LandingPagesService.updateLandingPage(id, req.body);
        res.json(page);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const deletePage = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ message: 'ID is required' });

        await LandingPagesService.deleteLandingPage(id);
        res.json({ message: 'Page deleted' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
