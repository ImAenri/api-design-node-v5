import { Router } from 'express'

const router = Router()

router.get('/',(req, res) => {
    res.json({message: 'users'});
})

router.get('/:id',(req, res) => {
    res.json({message: 'got one user'});
})

router.put('/:id',(req, res) => {
    res.json({message: 'User updated successfully'});
})

router.delete('/:id',(req, res) => {
    res.json({message: 'User deleted successfully'});
})

export default router