/**
 * Polymarket Controller
 * Handles requests for Bitcoin markets from Polymarket
 */

import { Request, Response } from 'express';
import { getSimpleBitcoinMarkets, fetchMarketById } from '../../services/polymarket';

/**
 * GET /api/polymarket/bitcoin
 * Get all Bitcoin-related markets from Polymarket
 */
export async function getBitcoinMarkets(req: Request, res: Response) {
  try {
    const markets = await getSimpleBitcoinMarkets();

    return res.status(200).json({
      success: true,
      count: markets.length,
      markets,
    });
  } catch (error) {
    console.error('Error in getBitcoinMarkets:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch Bitcoin markets',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

/**
 * GET /api/polymarket/market/:id
 * Get specific market by ID
 */
export async function getMarketById(req: Request, res: Response) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Market ID is required',
      });
    }

    const market = await fetchMarketById(id);

    if (!market) {
      return res.status(404).json({
        success: false,
        message: 'Market not found',
      });
    }

    return res.status(200).json({
      success: true,
      market,
    });
  } catch (error) {
    console.error('Error in getMarketById:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch market',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
