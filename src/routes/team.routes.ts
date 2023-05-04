import { Router } from 'express';
import { container } from 'tsyringe';
import TeamController from '../controller/team.controller';
import authMiddleware from '../middleware/auth';

const router = Router();
const teamController = container.resolve(TeamController);

router.get('/', authMiddleware(["user", "admin"]), (req, res) => teamController.getAllTeam(req, res));
router.get('/:id', authMiddleware(["user", "admin"]), (req, res) => teamController.getTeamById(req, res));
router.post('/', authMiddleware(["admin"]), (req, res) => teamController.createTeam(req, res));
router.put('/:id', authMiddleware(["admin"]), (req, res) => teamController.updateTeam(req, res));
router.delete('/:id/delete', authMiddleware(["admin"]), (req, res) => teamController.deleteTeam(req, res));

export default router;
