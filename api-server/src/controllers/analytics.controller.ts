import { errorHandler } from '../utils/errorHandler.js';

export const getAnalyticsOverview = async (req, res) => {
    try {
      const { uid, role } = req.user;
  
  
      res.status(200).json({
        success: true,
        data: {
          
        }
      });
    } catch (error) {
      errorHandler(error, req, res);
    }
}
