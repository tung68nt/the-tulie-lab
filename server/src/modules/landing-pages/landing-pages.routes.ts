import { Router } from 'express';
import * as LandingPagesController from './landing-pages.controller';
import { authenticate, authorize } from '../../middleware/auth';

const router = Router();

// Public
router.get('/:slug', LandingPagesController.getPage);

// Admin
router.get('/', authenticate, authorize(['ADMIN']), LandingPagesController.listPages);
router.post('/', authenticate, authorize(['ADMIN']), LandingPagesController.createPage);
router.put('/:id', authenticate, authorize(['ADMIN']), LandingPagesController.updatePage);
router.delete('/:id', authenticate, authorize(['ADMIN']), LandingPagesController.deletePage);

export default router;
