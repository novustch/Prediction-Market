import { MarketFilter } from "../../type";

export const buildMarketFilterQuery = (filters: MarketFilter) => {
  const query: any = {};

  // Volume = 2 * initAmount - (tradingAmountA + tradingAmountB)
  if (filters.volumeMin !== undefined || filters.volumeMax !== undefined) {
    query.$expr = query.$expr || { $and: [] };

    const computedVolume = {
      $subtract: [
        { $multiply: ['$initAmount', 2] },
        { $add: ['$tradingAmountA', '$tradingAmountB'] }
      ]
    };

    if (filters.volumeMin !== undefined) {
      query.$expr.$and.push({
        $gte: [computedVolume, filters.volumeMin]
      });
    }
    if (filters.volumeMax !== undefined) {
      query.$expr.$and.push({
        $lte: [computedVolume, filters.volumeMax]
      });
    }
  }

  // Expiry Time (date field is ISO string)
  if (filters.expiryStart || filters.expiryEnd) {
    query.date = {};
    if (filters.expiryStart) query.date.$gte = filters.expiryStart;
    if (filters.expiryEnd) query.date.$lte = filters.expiryEnd;
  }

  // Yes Probability = tokenAPrice / (tokenAPrice + tokenBPrice)
  if (filters.yesProbMin !== undefined || filters.yesProbMax !== undefined) {
    query.$expr = query.$expr || { $and: [] };
    const yesProb = {
      $divide: [
        '$tokenAPrice',
        { $add: ['$tokenAPrice', '$tokenBPrice'] }
      ]
    };
    if (filters.yesProbMin !== undefined) {
      query.$expr.$and.push({ $gte: [yesProb, filters.yesProbMin] });
    }
    if (filters.yesProbMax !== undefined) {
      query.$expr.$and.push({ $lte: [yesProb, filters.yesProbMax] });
    }
  }

  // No Probability = tokenBPrice / (tokenAPrice + tokenBPrice)
  if (filters.noProbMin !== undefined || filters.noProbMax !== undefined) {
    query.$expr = query.$expr || { $and: [] };
    const noProb = {
      $divide: [
        '$tokenBPrice',
        { $add: ['$tokenAPrice', '$tokenBPrice'] }
      ]
    };
    if (filters.noProbMin !== undefined) {
      query.$expr.$and.push({ $gte: [noProb, filters.noProbMin] });
    }
    if (filters.noProbMax !== undefined) {
      query.$expr.$and.push({ $lte: [noProb, filters.noProbMax] });
    }
  }

  return query;
};