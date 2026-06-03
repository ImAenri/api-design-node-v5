import { Router } from 'express'

const router = Router()

router.get('/',(req, res) => {
    res.json({message: 'habbits'});
})

router.get('/:id',(req, res) => {
    res.json({message: 'got one habbit'});
})

router.post('/',(req, res) => {
    res.json({message: 'Habbit created successfully'});
})

router.delete('/:id',(req, res) => {
    res.json({message: 'Habbit deleted successfully'});
})

router.post('/:id/complete',(req, res) => {
    res.json({message: 'Habbit completed successfully'}).status(201);
})

export default router