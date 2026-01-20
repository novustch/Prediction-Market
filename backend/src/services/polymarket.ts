/**
 * Polymarket API Service
 * Fetches Bitcoin prediction markets from Polymarket's public API
 */

const POLYMARKET_API_BASE = 'https://gamma-api.polymarket.com';

export interface PolymarketMarket {
  id: string;
  question: string;
  description?: string;
  end_date_iso: string;
  image?: string;
  active: boolean;
  closed: boolean;
  outcomes: string[];
  outcome_prices: string[];
  volume: string;
  liquidity: string;
  slug?: string;
}

export interface PolymarketEvent {
  id: string;
  title: string;
  slug: string;
  description?: string;
  image?: string;
  active: boolean;
  closed: boolean;
  end_date_iso: string;
  markets: PolymarketMarket[];
}

/**
 * Fetch Bitcoin-related markets from Polymarket
 */
export async function fetchBitcoinMarkets(): Promise<PolymarketMarket[]> {
  try {
    // Search for Bitcoin markets using the events endpoint
    const response = await fetch(
      `${POLYMARKET_API_BASE}/events?active=true&closed=false&limit=20`
    );

    if (!response.ok) {
      throw new Error(`Polymarket API error: ${response.statusText}`);
    }

    const events: PolymarketEvent[] = await response.json();

    // Filter Bitcoin-related markets
    const bitcoinMarkets: PolymarketMarket[] = [];

    for (const event of events) {
      // Check if event is Bitcoin-related
      const isBitcoinRelated =
        event.title.toLowerCase().includes('bitcoin') ||
        event.title.toLowerCase().includes('btc') ||
        event.description?.toLowerCase().includes('bitcoin');

      if (isBitcoinRelated && event.markets && event.markets.length > 0) {
        event.markets.forEach(market => {
          bitcoinMarkets.push({
            ...market,
            question: market.question || event.title,
            description: market.description || event.description,
            image: market.image || event.image,
          });
        });
      }
    }

    return bitcoinMarkets;
  } catch (error) {
    console.error('Error fetching Polymarket Bitcoin markets:', error);
    throw error;
  }
}

/**
 * Fetch a specific market by ID
 */
export async function fetchMarketById(marketId: string): Promise<PolymarketMarket | null> {
  try {
    const response = await fetch(`${POLYMARKET_API_BASE}/markets/${marketId}`);

    if (!response.ok) {
      return null;
    }

    const market: PolymarketMarket = await response.json();
    return market;
  } catch (error) {
    console.error(`Error fetching market ${marketId}:`, error);
    return null;
  }
}

/**
 * Get simplified market data for CheckBrice UI
 */
export async function getSimpleBitcoinMarkets() {
  try {
    const markets = await fetchBitcoinMarkets();

    // Transform to simple format
    return markets.map(market => {
      const yesPrice = market.outcome_prices?.[0]
        ? parseFloat(market.outcome_prices[0])
        : 0.5;
      const noPrice = market.outcome_prices?.[1]
        ? parseFloat(market.outcome_prices[1])
        : 0.5;

      return {
        id: market.id,
        question: market.question,
        description: market.description || '',
        image: market.image || 'https://via.placeholder.com/400x300?text=Bitcoin',
        yesPercent: Math.round(yesPrice * 100),
        noPercent: Math.round(noPrice * 100),
        volume: market.volume || '0',
        liquidity: market.liquidity || '0',
        deadline: market.end_date_iso,
        active: market.active && !market.closed,
        slug: market.slug || market.id,
      };
    });
  } catch (error) {
    console.error('Error getting simple Bitcoin markets:', error);
    return [];
  }
}
