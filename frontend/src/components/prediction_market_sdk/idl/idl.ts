export type Prediction = {
  "version": "0.1.0",
  "name": "prediction",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "global",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "GlobalParams"
          }
        }
      ]
    },
    {
      "name": "getRes",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "market",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "feedAggregator",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "feed",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "initMarket",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "feeAuthority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "market",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "globalPda",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "feed",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "metadataA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "metadataB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMintA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMintB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMetadataProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "MarketParams"
          }
        }
      ]
    },
    {
      "name": "addLiquidity",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "feeAuthority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "market",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "global",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "createBet",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "creator",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK reward token"
          ]
        },
        {
          "name": "pdaTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "feeAuthority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "market",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "global",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMetadataProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "BettingParams"
          }
        }
      ]
    },
    {
      "name": "mintToken",
      "accounts": [
        {
          "name": "pdaTokenAAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pdaTokenBAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "feeAuthority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "market",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "global",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "metadataA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "metadataB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMintA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMintB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMetadataProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "marketId",
          "type": "string"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "global",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "admin",
            "type": "publicKey"
          },
          {
            "name": "feeAuthority",
            "type": "publicKey"
          },
          {
            "name": "creatorFeeAmount",
            "type": "u64"
          },
          {
            "name": "liqudityUserFeeAmount",
            "type": "u64"
          },
          {
            "name": "bettingUserFeeAmount",
            "type": "u64"
          },
          {
            "name": "decimal",
            "type": "u8"
          },
          {
            "name": "marketCount",
            "type": "u64"
          },
          {
            "name": "feePercentage",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "market",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "creator",
            "type": "publicKey"
          },
          {
            "name": "feed",
            "type": "publicKey"
          },
          {
            "name": "value",
            "type": "f64"
          },
          {
            "name": "range",
            "type": "u8"
          },
          {
            "name": "marketStatus",
            "type": {
              "defined": "MarketStatus"
            }
          },
          {
            "name": "result",
            "type": "bool"
          },
          {
            "name": "tokenA",
            "type": "publicKey"
          },
          {
            "name": "tokenB",
            "type": "publicKey"
          },
          {
            "name": "tokenAAmount",
            "type": "u64"
          },
          {
            "name": "tokenBAmount",
            "type": "u64"
          },
          {
            "name": "tokenPriceA",
            "type": "u64"
          },
          {
            "name": "tokenPriceB",
            "type": "u64"
          },
          {
            "name": "yesAmount",
            "type": "u16"
          },
          {
            "name": "noAmount",
            "type": "u16"
          },
          {
            "name": "totalReserve",
            "type": "u64"
          },
          {
            "name": "resolutionDate",
            "type": "i64"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "GlobalParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "feeAuthority",
            "type": "publicKey"
          },
          {
            "name": "creatorFeeAmount",
            "type": "u64"
          },
          {
            "name": "liqudityUserFeeAmount",
            "type": "u64"
          },
          {
            "name": "bettingUserFeeAmount",
            "type": "u64"
          },
          {
            "name": "marketCount",
            "type": "u64"
          },
          {
            "name": "decimal",
            "type": "u8"
          },
          {
            "name": "feePercentage",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "MarketParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "value",
            "type": "f64"
          },
          {
            "name": "range",
            "type": "u8"
          },
          {
            "name": "date",
            "type": "i64"
          },
          {
            "name": "tokenAmount",
            "type": "u64"
          },
          {
            "name": "tokenPrice",
            "type": "u64"
          },
          {
            "name": "marketId",
            "type": "string"
          },
          {
            "name": "nameA",
            "type": {
              "option": "string"
            }
          },
          {
            "name": "nameB",
            "type": {
              "option": "string"
            }
          },
          {
            "name": "symbolA",
            "type": {
              "option": "string"
            }
          },
          {
            "name": "symbolB",
            "type": {
              "option": "string"
            }
          },
          {
            "name": "urlA",
            "type": {
              "option": "string"
            }
          },
          {
            "name": "urlB",
            "type": {
              "option": "string"
            }
          }
        ]
      }
    },
    {
      "name": "BettingParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "marketId",
            "type": "string"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "isYes",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "MarketStatus",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Prepare"
          },
          {
            "name": "Active"
          },
          {
            "name": "Finished"
          }
        ]
      }
    }
  ],
  "events": [
    {
      "name": "GlobalInitialized",
      "fields": [
        {
          "name": "globalId",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "feeRecipient",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "creatorFeeAmount",
          "type": "u64",
          "index": false
        },
        {
          "name": "liqudityUserFeeAmount",
          "type": "u64",
          "index": false
        },
        {
          "name": "bettingUserFeeAmount",
          "type": "u64",
          "index": false
        },
        {
          "name": "marketCount",
          "type": "u64",
          "index": false
        },
        {
          "name": "decimal",
          "type": "u8",
          "index": false
        },
        {
          "name": "feePercentage",
          "type": "u8",
          "index": false
        }
      ]
    },
    {
      "name": "OracleResUpdated",
      "fields": [
        {
          "name": "oracleRes",
          "type": "f64",
          "index": false
        }
      ]
    },
    {
      "name": "MarketCreated",
      "fields": [
        {
          "name": "marketId",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "value",
          "type": "f64",
          "index": false
        },
        {
          "name": "range",
          "type": "u8",
          "index": false
        },
        {
          "name": "creator",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "feed",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "tokenA",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "tokenB",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "marketStatus",
          "type": {
            "defined": "MarketStatus"
          },
          "index": false
        },
        {
          "name": "tokenAAmount",
          "type": "u64",
          "index": false
        },
        {
          "name": "tokenBAmount",
          "type": "u64",
          "index": false
        },
        {
          "name": "tokenPriceA",
          "type": "u64",
          "index": false
        },
        {
          "name": "tokenPriceB",
          "type": "u64",
          "index": false
        },
        {
          "name": "totalReserve",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "MarketStatusUpdated",
      "fields": [
        {
          "name": "marketId",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "marketStatus",
          "type": {
            "defined": "MarketStatus"
          },
          "index": false
        }
      ]
    },
    {
      "name": "BettingEvent",
      "fields": [
        {
          "name": "tokenAPrice",
          "type": "u64",
          "index": false
        },
        {
          "name": "tokenBPrice",
          "type": "u64",
          "index": false
        }
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidSwitchboardAccount",
      "msg": "Not a valid Switchboard account"
    },
    {
      "code": 6001,
      "name": "StaleFeed",
      "msg": "Switchboard feed has not been updated in 5 minutes"
    },
    {
      "code": 6002,
      "name": "ConfidenceIntervalExceeded",
      "msg": "Switchboard feed exceeded provided confidence interval"
    },
    {
      "code": 6003,
      "name": "SolPriceBelowUnlockPrice",
      "msg": "Current SOL price is not above Escrow unlock price."
    },
    {
      "code": 6004,
      "name": "ArithmeticError",
      "msg": "Arithmetic error"
    },
    {
      "code": 6005,
      "name": "InvalidCreator",
      "msg": "Invalid creator"
    },
    {
      "code": 6006,
      "name": "InvalidFeeAuthority",
      "msg": "Invalid fee authority"
    },
    {
      "code": 6007,
      "name": "NotPreparing",
      "msg": "Not preparing status"
    },
    {
      "code": 6008,
      "name": "InvalidMarket",
      "msg": "Invalid market"
    },
    {
      "code": 6009,
      "name": "MarketNotActive",
      "msg": "Market is not active"
    }
  ]
};

export const IDL: Prediction = {
  "version": "0.1.0",
  "name": "prediction",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "global",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "GlobalParams"
          }
        }
      ]
    },
    {
      "name": "getRes",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "market",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "feedAggregator",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "feed",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "initMarket",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "feeAuthority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "market",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "globalPda",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "feed",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "metadataA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "metadataB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMintA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMintB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMetadataProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "MarketParams"
          }
        }
      ]
    },
    {
      "name": "addLiquidity",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "feeAuthority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "market",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "global",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "createBet",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "creator",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK reward token"
          ]
        },
        {
          "name": "pdaTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "feeAuthority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "market",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "global",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMetadataProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "BettingParams"
          }
        }
      ]
    },
    {
      "name": "mintToken",
      "accounts": [
        {
          "name": "pdaTokenAAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pdaTokenBAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "feeAuthority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "market",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "global",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "metadataA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "metadataB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMintA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMintB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMetadataProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "marketId",
          "type": "string"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "global",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "admin",
            "type": "publicKey"
          },
          {
            "name": "feeAuthority",
            "type": "publicKey"
          },
          {
            "name": "creatorFeeAmount",
            "type": "u64"
          },
          {
            "name": "liqudityUserFeeAmount",
            "type": "u64"
          },
          {
            "name": "bettingUserFeeAmount",
            "type": "u64"
          },
          {
            "name": "decimal",
            "type": "u8"
          },
          {
            "name": "marketCount",
            "type": "u64"
          },
          {
            "name": "feePercentage",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "market",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "creator",
            "type": "publicKey"
          },
          {
            "name": "feed",
            "type": "publicKey"
          },
          {
            "name": "value",
            "type": "f64"
          },
          {
            "name": "range",
            "type": "u8"
          },
          {
            "name": "marketStatus",
            "type": {
              "defined": "MarketStatus"
            }
          },
          {
            "name": "result",
            "type": "bool"
          },
          {
            "name": "tokenA",
            "type": "publicKey"
          },
          {
            "name": "tokenB",
            "type": "publicKey"
          },
          {
            "name": "tokenAAmount",
            "type": "u64"
          },
          {
            "name": "tokenBAmount",
            "type": "u64"
          },
          {
            "name": "tokenPriceA",
            "type": "u64"
          },
          {
            "name": "tokenPriceB",
            "type": "u64"
          },
          {
            "name": "yesAmount",
            "type": "u16"
          },
          {
            "name": "noAmount",
            "type": "u16"
          },
          {
            "name": "totalReserve",
            "type": "u64"
          },
          {
            "name": "resolutionDate",
            "type": "i64"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "GlobalParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "feeAuthority",
            "type": "publicKey"
          },
          {
            "name": "creatorFeeAmount",
            "type": "u64"
          },
          {
            "name": "liqudityUserFeeAmount",
            "type": "u64"
          },
          {
            "name": "bettingUserFeeAmount",
            "type": "u64"
          },
          {
            "name": "marketCount",
            "type": "u64"
          },
          {
            "name": "decimal",
            "type": "u8"
          },
          {
            "name": "feePercentage",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "MarketParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "value",
            "type": "f64"
          },
          {
            "name": "range",
            "type": "u8"
          },
          {
            "name": "date",
            "type": "i64"
          },
          {
            "name": "tokenAmount",
            "type": "u64"
          },
          {
            "name": "tokenPrice",
            "type": "u64"
          },
          {
            "name": "marketId",
            "type": "string"
          },
          {
            "name": "nameA",
            "type": {
              "option": "string"
            }
          },
          {
            "name": "nameB",
            "type": {
              "option": "string"
            }
          },
          {
            "name": "symbolA",
            "type": {
              "option": "string"
            }
          },
          {
            "name": "symbolB",
            "type": {
              "option": "string"
            }
          },
          {
            "name": "urlA",
            "type": {
              "option": "string"
            }
          },
          {
            "name": "urlB",
            "type": {
              "option": "string"
            }
          }
        ]
      }
    },
    {
      "name": "BettingParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "marketId",
            "type": "string"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "isYes",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "MarketStatus",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Prepare"
          },
          {
            "name": "Active"
          },
          {
            "name": "Finished"
          }
        ]
      }
    }
  ],
  "events": [
    {
      "name": "GlobalInitialized",
      "fields": [
        {
          "name": "globalId",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "feeRecipient",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "creatorFeeAmount",
          "type": "u64",
          "index": false
        },
        {
          "name": "liqudityUserFeeAmount",
          "type": "u64",
          "index": false
        },
        {
          "name": "bettingUserFeeAmount",
          "type": "u64",
          "index": false
        },
        {
          "name": "marketCount",
          "type": "u64",
          "index": false
        },
        {
          "name": "decimal",
          "type": "u8",
          "index": false
        },
        {
          "name": "feePercentage",
          "type": "u8",
          "index": false
        }
      ]
    },
    {
      "name": "OracleResUpdated",
      "fields": [
        {
          "name": "oracleRes",
          "type": "f64",
          "index": false
        }
      ]
    },
    {
      "name": "MarketCreated",
      "fields": [
        {
          "name": "marketId",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "value",
          "type": "f64",
          "index": false
        },
        {
          "name": "range",
          "type": "u8",
          "index": false
        },
        {
          "name": "creator",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "feed",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "tokenA",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "tokenB",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "marketStatus",
          "type": {
            "defined": "MarketStatus"
          },
          "index": false
        },
        {
          "name": "tokenAAmount",
          "type": "u64",
          "index": false
        },
        {
          "name": "tokenBAmount",
          "type": "u64",
          "index": false
        },
        {
          "name": "tokenPriceA",
          "type": "u64",
          "index": false
        },
        {
          "name": "tokenPriceB",
          "type": "u64",
          "index": false
        },
        {
          "name": "totalReserve",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "MarketStatusUpdated",
      "fields": [
        {
          "name": "marketId",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "marketStatus",
          "type": {
            "defined": "MarketStatus"
          },
          "index": false
        }
      ]
    },
    {
      "name": "BettingEvent",
      "fields": [
        {
          "name": "tokenAPrice",
          "type": "u64",
          "index": false
        },
        {
          "name": "tokenBPrice",
          "type": "u64",
          "index": false
        }
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidSwitchboardAccount",
      "msg": "Not a valid Switchboard account"
    },
    {
      "code": 6001,
      "name": "StaleFeed",
      "msg": "Switchboard feed has not been updated in 5 minutes"
    },
    {
      "code": 6002,
      "name": "ConfidenceIntervalExceeded",
      "msg": "Switchboard feed exceeded provided confidence interval"
    },
    {
      "code": 6003,
      "name": "SolPriceBelowUnlockPrice",
      "msg": "Current SOL price is not above Escrow unlock price."
    },
    {
      "code": 6004,
      "name": "ArithmeticError",
      "msg": "Arithmetic error"
    },
    {
      "code": 6005,
      "name": "InvalidCreator",
      "msg": "Invalid creator"
    },
    {
      "code": 6006,
      "name": "InvalidFeeAuthority",
      "msg": "Invalid fee authority"
    },
    {
      "code": 6007,
      "name": "NotPreparing",
      "msg": "Not preparing status"
    },
    {
      "code": 6008,
      "name": "InvalidMarket",
      "msg": "Invalid market"
    },
    {
      "code": 6009,
      "name": "MarketNotActive",
      "msg": "Market is not active"
    }
  ]
};
