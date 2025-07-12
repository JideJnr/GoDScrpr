import { errorHandler } from "../utils/errorHandler";
import { Request, Response } from 'express';


export const predictionsOverview = async (req:Request, res:Response) => {
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

export const getAllPredictions = async (req:Request, res:Response) => {
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

export const getMatchPredictions = async (req:Request, res:Response) => {
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


export const getAllActivePredictions = async (req:Request, res:Response) => {
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

export const getAllSuccessfulPredictions = async (req:Request, res:Response) => {
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

export const getAllFailedPredictions = async (req:Request, res:Response) => {
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


