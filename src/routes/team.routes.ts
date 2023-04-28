import { Router } from 'express';
import { container } from 'tsyringe';
import TeamController from '../controller/team.controller';

const router = Router();
const teamController = container.resolve(TeamController);

router.get('/', (req, res) => teamController.getAllTeam(req, res));
router.get('/:id', (req, res) => teamController.getTeamById(req, res));
router.post('/', (req, res) => teamController.createTeam(req, res));
router.put('/:id', (req, res) => teamController.updateTeam(req, res));
router.put('/:id', (req, res) => teamController.deleteTeam(req, res));

export default router;
