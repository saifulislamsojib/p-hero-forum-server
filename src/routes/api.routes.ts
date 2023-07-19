import { Router } from 'express';
import postRoutes from './post.routes';
import commentRoute from './comment.routes';

const apiRoutes = Router();

apiRoutes.use('/post', postRoutes);
apiRoutes.use('/comment', commentRoute);

export default apiRoutes;
