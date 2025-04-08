import express, { Router, Request, Response } from 'express';
import multer from 'multer';
import PrismaClient from '../bin/prisma-client';

const router: Router = express.Router();
const upload: multer.Multer = multer({ storage: multer.memoryStorage() });

router.post('/upload', upload.single('jsonFile'), async function (req: Request, res: Response) {
    const file: Express.Multer.File | undefined = req.file;
    const data = JSON.parse(file!.buffer.toString()).prizes;
    try {
        for (const p of data) {
            const prize = await PrismaClient.prize.create({
                data: {
                    year: parseInt(p.year),
                    category: p.category,
                },
            });
            if (p.hasOwnProperty('laureates')) {
                for (const laureate of p.laureates) {
                    if (!laureate.hasOwnProperty('surname')) {
                        laureate.surname = '';
                    }
                    await PrismaClient.winner.create({
                        data: {
                            motivation: laureate.motivation,
                            firstName: laureate.firstname,
                            lastName: laureate.surname,
                            prize: {
                                connect: {
                                    id: prize.id,
                                },
                            },
                        },
                    });
                }
            }
        }
        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.sendStatus(400);
    }
});

router.get('/search-prizes/:keyword', async function (req: Request, res: Response) {
    const keyword: string = req.params.keyword;
    console.log('searching with keyword "' + keyword + '"');
    try {
        const winners = await PrismaClient.winner.findMany({
            where: {
                motivation: {
                    contains: keyword,
                },
            },
            include: {
                prize: true,
            },
        });
        if (winners === null) {
            console.error('No results found with keyword ' + keyword);
            res.sendStatus(404);
        } else {
            console.log(winners);
            res.status(200).send(JSON.stringify(winners));
        }
    } catch (error) {
        console.error(error);
        res.sendStatus(400);
    }
});

export default router;
