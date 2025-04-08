import express, { Router, Request, Response } from 'express';
import multer from 'multer';
import PrismaClient from '../bin/prisma-client';

const router: Router = express.Router();
const upload: multer.Multer = multer({ storage: multer.memoryStorage() });

router.post('/upload', upload.single('jsonFile'), async function (req: Request, res: Response) {

});

router.get('/search-prizes/:keyword', async function (req: Request, res: Response) {

});

export default router;
