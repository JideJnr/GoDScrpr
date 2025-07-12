import { errorHandler } from "../utils/errorHandler";
import { Request, Response } from 'express';



export const getAllMatchesByDate = async (req, res) => {
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

export const getAllLiveMatches = async (req, res) => {
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

export const getMatchById = async (req, res) => {
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

export const getAllLeagues = async (req, res) => {
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

export const getLeagueById = async (req, res) => {
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

export const getAllTeams = async (req, res) => {
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

export const getTeamById = async (req, res) => {
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

export const getAllPlayers = async (req, res) => {
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

export const getPlayerById = async (req, res) => {
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

export const getAllTeamsByFilter = async (req, res) => {
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

export const getMatchVerdicts = async (req: Request, res: Response) => {
    try {
      const { uid, role } = req.user;
  
      // Fetch match verdicts using GodComplex
      const matchVerdicts = await god.getMatchVerdicts();
  
      res.status(200).json({
        success: true,
        data: matchVerdicts
      });
    } catch (error) {
      errorHandler(error, req, res);
    }



};