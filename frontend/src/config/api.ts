/**
 * API Configuration
 * 
 * The backend API URL can be configured via environment variables:
 * - NEXT_PUBLIC_API_URL (defaults to http://localhost:9000)
 */

export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:9000";

export const API_ENDPOINTS = {
  MARKET: {
    CREATE: `${API_URL}/api/market/create`,
    ADD: `${API_URL}/api/market/add`,
    GET: `${API_URL}/api/market/get`,
    BETTING: `${API_URL}/api/market/betting`,
    LIQUIDITY: `${API_URL}/api/market/liquidity`,
    ADD_LIQUIDITY: `${API_URL}/api/market/addLiquidity`,
  },
  ORACLE: {
    REGISTER_FEED: `${API_URL}/api/oracle/registFeed`,
  },
  REFERRAL: {
    GET_OR_GENERATE: `${API_URL}/api/referral/`,
    CLAIM: `${API_URL}/api/referral/claim`,
  },
  PROFILE: {
    GET: `${API_URL}/api/profile/`,
  },
} as const;

