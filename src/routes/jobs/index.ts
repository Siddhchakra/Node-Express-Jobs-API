import { Router } from 'express';
import { createJob, deleteJob, getJob, getJobs, updateJob } from '@src/controllers';

//Another way to create routes for EXPRESS
const router = Router();

router.route('/jobs').get(getJobs).post(createJob);
router.route('/jobs/:id').get(getJob).patch(updateJob).delete(deleteJob);

export default router;
