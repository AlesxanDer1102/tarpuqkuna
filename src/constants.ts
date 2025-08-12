
interface ContractsConfig {
    [chainId: number]: {
        actors: string
        farmNFT: string
        certificates: string
        agroTrace: string
    }
}


// ===== CONTRACT ADDRESSES (Update after deployment) =====

export const chainsToContracts: ContractsConfig = {
    11155111: {
        actors: "0xCE1E62a3F4fD5Df7645E149192bA709149387B57",
        farmNFT: "0x15959d32a1dcD2ebD0E7c957B14217ef86F091C5",
        certificates: "0x36bfdb2999a3c2adb5405c7fdd8430fe1b7b83d8",
        agroTrace: "0xfce8d6510898854508c8f8d494e5595ed0a40184",
    },
}


export const ACTORS_REGISTRY_ADDRESS = process.env.NEXT_PUBLIC_ACTORS_REGISTRY_ADDRESS!
export const FARM_NFT_ADDRESS = process.env.NEXT_PUBLIC_FARM_NFT_ADDRESS!
export const CERTIFICATES_ADDRESS = process.env.NEXT_PUBLIC_CERTIFICATES_ADDRESS!
export const AGROTRACE_ADDRESS = process.env.NEXT_PUBLIC_AGROTRACE_ADDRESS!

export const actorsRegistryAbi = [
  {
    "inputs": [
      { "internalType": "address", "name": "admin", "type": "address" }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  { "inputs": [], "name": "AccessControlBadConfirmation", "type": "error" },
  {
    "inputs": [
      { "internalType": "address", "name": "account", "type": "address" },
      { "internalType": "bytes32", "name": "neededRole", "type": "bytes32" }
    ],
    "name": "AccessControlUnauthorizedAccount",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "who",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "active",
        "type": "bool"
      }
    ],
    "name": "ActorActivation",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "who",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "orgName",
        "type": "string"
      }
    ],
    "name": "ActorAdded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "who",
        "type": "address"
      }
    ],
    "name": "ActorUpdated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "previousAdminRole",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "newAdminRole",
        "type": "bytes32"
      }
    ],
    "name": "RoleAdminChanged",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "sender",
        "type": "address"
      }
    ],
    "name": "RoleGranted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "who",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      }
    ],
    "name": "RoleGrantedExt",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "sender",
        "type": "address"
      }
    ],
    "name": "RoleRevoked",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "who",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "role",
        "type": "bytes32"
      }
    ],
    "name": "RoleRevokedExt",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "DEFAULT_ADMIN_ROLE",
    "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "REGISTRY_ADMIN_ROLE",
    "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "ROLE_INSPECTOR",
    "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "ROLE_PROCESSOR",
    "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "ROLE_PRODUCER",
    "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "ROLE_RETAILER",
    "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "ROLE_TRANSPORTER",
    "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "who", "type": "address" },
      { "internalType": "string", "name": "orgName", "type": "string" },
      { "internalType": "string", "name": "did", "type": "string" },
      { "internalType": "string", "name": "metaURI", "type": "string" },
      { "internalType": "bool", "name": "active", "type": "bool" }
    ],
    "name": "addActor",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "who", "type": "address" }],
    "name": "getActor",
    "outputs": [
      { "internalType": "string", "name": "", "type": "string" },
      { "internalType": "string", "name": "", "type": "string" },
      { "internalType": "string", "name": "", "type": "string" },
      { "internalType": "bool", "name": "", "type": "bool" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "bytes32", "name": "role", "type": "bytes32" }
    ],
    "name": "getRoleAdmin",
    "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "bytes32", "name": "role", "type": "bytes32" },
      { "internalType": "address", "name": "account", "type": "address" }
    ],
    "name": "grantRole",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "who", "type": "address" },
      { "internalType": "bytes32", "name": "role_", "type": "bytes32" }
    ],
    "name": "grantRoleFor",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "bytes32", "name": "role", "type": "bytes32" },
      { "internalType": "address", "name": "account", "type": "address" }
    ],
    "name": "hasRole",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "who", "type": "address" },
      { "internalType": "bytes32", "name": "role_", "type": "bytes32" }
    ],
    "name": "hasRole",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "who", "type": "address" }],
    "name": "isActive",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "bytes32", "name": "role", "type": "bytes32" },
      {
        "internalType": "address",
        "name": "callerConfirmation",
        "type": "address"
      }
    ],
    "name": "renounceRole",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "bytes32", "name": "role", "type": "bytes32" },
      { "internalType": "address", "name": "account", "type": "address" }
    ],
    "name": "revokeRole",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "who", "type": "address" },
      { "internalType": "bytes32", "name": "role_", "type": "bytes32" }
    ],
    "name": "revokeRoleFor",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "bytes4", "name": "interfaceId", "type": "bytes4" }
    ],
    "name": "supportsInterface",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "who", "type": "address" },
      { "internalType": "string", "name": "orgName", "type": "string" },
      { "internalType": "string", "name": "did", "type": "string" },
      { "internalType": "string", "name": "metaURI", "type": "string" },
      { "internalType": "bool", "name": "active", "type": "bool" }
    ],
    "name": "updateActor",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]


export const agroTraceAbi = [
    {
        "inputs": [
            { "internalType": "string", "name": "baseURI", "type": "string" },
            { "internalType": "address", "name": "farmNFT_", "type": "address" },
            {
                "internalType": "address",
                "name": "actorsRegistry_",
                "type": "address"
            },
            { "internalType": "address", "name": "admin", "type": "address" }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    { "inputs": [], "name": "AccessControlBadConfirmation", "type": "error" },
    {
        "inputs": [
            { "internalType": "address", "name": "account", "type": "address" },
            { "internalType": "bytes32", "name": "neededRole", "type": "bytes32" }
        ],
        "name": "AccessControlUnauthorizedAccount",
        "type": "error"
    },
    {
        "inputs": [
            { "internalType": "address", "name": "sender", "type": "address" },
            { "internalType": "uint256", "name": "balance", "type": "uint256" },
            { "internalType": "uint256", "name": "needed", "type": "uint256" },
            { "internalType": "uint256", "name": "tokenId", "type": "uint256" }
        ],
        "name": "ERC1155InsufficientBalance",
        "type": "error"
    },
    {
        "inputs": [
            { "internalType": "address", "name": "approver", "type": "address" }
        ],
        "name": "ERC1155InvalidApprover",
        "type": "error"
    },
    {
        "inputs": [
            { "internalType": "uint256", "name": "idsLength", "type": "uint256" },
            { "internalType": "uint256", "name": "valuesLength", "type": "uint256" }
        ],
        "name": "ERC1155InvalidArrayLength",
        "type": "error"
    },
    {
        "inputs": [
            { "internalType": "address", "name": "operator", "type": "address" }
        ],
        "name": "ERC1155InvalidOperator",
        "type": "error"
    },
    {
        "inputs": [
            { "internalType": "address", "name": "receiver", "type": "address" }
        ],
        "name": "ERC1155InvalidReceiver",
        "type": "error"
    },
    {
        "inputs": [
            { "internalType": "address", "name": "sender", "type": "address" }
        ],
        "name": "ERC1155InvalidSender",
        "type": "error"
    },
    {
        "inputs": [
            { "internalType": "address", "name": "operator", "type": "address" },
            { "internalType": "address", "name": "owner", "type": "address" }
        ],
        "name": "ERC1155MissingApprovalForAll",
        "type": "error"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "account",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "operator",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "bool",
                "name": "approved",
                "type": "bool"
            }
        ],
        "name": "ApprovalForAll",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "lotId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "bytes12",
                "name": "destinationGeohash",
                "type": "bytes12"
            },
            {
                "indexed": false,
                "internalType": "uint64",
                "name": "deliveredAt",
                "type": "uint64"
            },
            {
                "indexed": false,
                "internalType": "bytes32",
                "name": "receiptHash",
                "type": "bytes32"
            }
        ],
        "name": "Delivered",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "harvestId",
                "type": "bytes32"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "farmNftId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "product",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "uint64",
                "name": "startDate",
                "type": "uint64"
            }
        ],
        "name": "HarvestCreated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "parent",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "child",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amountIn",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amountOut",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "bytes32",
                "name": "processType",
                "type": "bytes32"
            }
        ],
        "name": "LotDerived",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "harvestId",
                "type": "bytes32"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            }
        ],
        "name": "LotMinted",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "role",
                "type": "bytes32"
            },
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "previousAdminRole",
                "type": "bytes32"
            },
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "newAdminRole",
                "type": "bytes32"
            }
        ],
        "name": "RoleAdminChanged",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "role",
                "type": "bytes32"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "account",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "sender",
                "type": "address"
            }
        ],
        "name": "RoleGranted",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "role",
                "type": "bytes32"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "account",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "sender",
                "type": "address"
            }
        ],
        "name": "RoleRevoked",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "lotId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "bytes12",
                "name": "fromGeohash",
                "type": "bytes12"
            },
            {
                "indexed": false,
                "internalType": "bytes12",
                "name": "toGeohash",
                "type": "bytes12"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "carrier",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint64",
                "name": "eta",
                "type": "uint64"
            }
        ],
        "name": "RouteDeclared",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "lotId",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "enum IAgroTrace1155.Stage",
                "name": "stage",
                "type": "uint8"
            },
            {
                "indexed": false,
                "internalType": "uint64",
                "name": "time",
                "type": "uint64"
            },
            {
                "indexed": false,
                "internalType": "bytes32",
                "name": "contentHash",
                "type": "bytes32"
            },
            {
                "indexed": false,
                "internalType": "int32",
                "name": "avgTemp_cDeci",
                "type": "int32"
            },
            {
                "indexed": false,
                "internalType": "int32",
                "name": "lastTemp_cDeci",
                "type": "int32"
            },
            {
                "indexed": false,
                "internalType": "int32",
                "name": "avgHumRel_pDeci",
                "type": "int32"
            },
            {
                "indexed": false,
                "internalType": "int32",
                "name": "lastHumRel_pDeci",
                "type": "int32"
            },
            {
                "indexed": false,
                "internalType": "int32",
                "name": "avgSoilMoist_pDeci",
                "type": "int32"
            },
            {
                "indexed": false,
                "internalType": "int32",
                "name": "lastSoilMoist_pDeci",
                "type": "int32"
            },
            {
                "indexed": false,
                "internalType": "bytes32",
                "name": "sensorRoot",
                "type": "bytes32"
            }
        ],
        "name": "StageAnchored",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "enum IAgroTrace1155.LotState",
                "name": "newState",
                "type": "uint8"
            },
            {
                "indexed": false,
                "internalType": "uint64",
                "name": "time",
                "type": "uint64"
            }
        ],
        "name": "StateChanged",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "lotId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "bytes12",
                "name": "placeGeohash",
                "type": "bytes12"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "actor",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint64",
                "name": "time",
                "type": "uint64"
            },
            {
                "indexed": false,
                "internalType": "bytes32",
                "name": "docRefHash",
                "type": "bytes32"
            },
            {
                "indexed": false,
                "internalType": "bytes32",
                "name": "sensorRoot",
                "type": "bytes32"
            }
        ],
        "name": "StopRecorded",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "operator",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256[]",
                "name": "ids",
                "type": "uint256[]"
            },
            {
                "indexed": false,
                "internalType": "uint256[]",
                "name": "values",
                "type": "uint256[]"
            }
        ],
        "name": "TransferBatch",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "operator",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "TransferSingle",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "string",
                "name": "value",
                "type": "string"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            }
        ],
        "name": "URI",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "DEFAULT_ADMIN_ROLE",
        "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "ROLE_RETAILER",
        "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }],
        "stateMutability": "pure",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "uint256", "name": "id", "type": "uint256" },
            { "internalType": "bytes32", "name": "root", "type": "bytes32" },
            { "internalType": "uint64", "name": "t0", "type": "uint64" },
            { "internalType": "uint64", "name": "t1", "type": "uint64" }
        ],
        "name": "appendSensorRoot",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "address", "name": "account", "type": "address" },
            { "internalType": "uint256", "name": "id", "type": "uint256" }
        ],
        "name": "balanceOf",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "address[]", "name": "accounts", "type": "address[]" },
            { "internalType": "uint256[]", "name": "ids", "type": "uint256[]" }
        ],
        "name": "balanceOfBatch",
        "outputs": [
            { "internalType": "uint256[]", "name": "", "type": "uint256[]" }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "address", "name": "account", "type": "address" },
            { "internalType": "uint256", "name": "id", "type": "uint256" },
            { "internalType": "uint256", "name": "value", "type": "uint256" }
        ],
        "name": "burn",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "address", "name": "account", "type": "address" },
            { "internalType": "uint256[]", "name": "ids", "type": "uint256[]" },
            { "internalType": "uint256[]", "name": "values", "type": "uint256[]" }
        ],
        "name": "burnBatch",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "uint256", "name": "farmNftId", "type": "uint256" },
            { "internalType": "string", "name": "product", "type": "string" },
            { "internalType": "uint64", "name": "startDate", "type": "uint64" },
            { "internalType": "uint64", "name": "season", "type": "uint64" },
            { "internalType": "uint64", "name": "seq", "type": "uint64" }
        ],
        "name": "createHarvest",
        "outputs": [
            { "internalType": "bytes32", "name": "harvestId", "type": "bytes32" }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "uint256", "name": "id", "type": "uint256" },
            { "internalType": "bytes12", "name": "fromG", "type": "bytes12" },
            { "internalType": "bytes12", "name": "toG", "type": "bytes12" },
            { "internalType": "address", "name": "carrier", "type": "address" },
            { "internalType": "uint64", "name": "eta", "type": "uint64" }
        ],
        "name": "declareRoute",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "uint256", "name": "id", "type": "uint256" }],
        "name": "exists",
        "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "farmNft",
        "outputs": [
            { "internalType": "contract IFarmNFT", "name": "", "type": "address" }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "uint256", "name": "parent", "type": "uint256" }
        ],
        "name": "getChildren",
        "outputs": [
            { "internalType": "uint256[]", "name": "", "type": "uint256[]" }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "bytes32", "name": "role", "type": "bytes32" }
        ],
        "name": "getRoleAdmin",
        "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "bytes32", "name": "role", "type": "bytes32" },
            { "internalType": "address", "name": "account", "type": "address" }
        ],
        "name": "grantRole",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "bytes32", "name": "hId", "type": "bytes32" },
            { "internalType": "uint256", "name": "idx", "type": "uint256" }
        ],
        "name": "harvestLots",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "bytes32", "name": "role", "type": "bytes32" },
            { "internalType": "address", "name": "account", "type": "address" }
        ],
        "name": "hasRole",
        "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "address", "name": "account", "type": "address" },
            { "internalType": "address", "name": "operator", "type": "address" }
        ],
        "name": "isApprovedForAll",
        "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "name": "lot",
        "outputs": [
            { "internalType": "uint256", "name": "farmNftId", "type": "uint256" },
            { "internalType": "bytes32", "name": "harvestId", "type": "bytes32" },
            { "internalType": "string", "name": "product", "type": "string" },
            { "internalType": "string", "name": "variety", "type": "string" },
            { "internalType": "bytes32", "name": "unit", "type": "bytes32" },
            { "internalType": "uint8", "name": "unitDecimals", "type": "uint8" },
            { "internalType": "string", "name": "tokenURI", "type": "string" },
            { "internalType": "bool", "name": "active", "type": "bool" }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "uint256", "name": "id", "type": "uint256" },
            { "internalType": "bytes12", "name": "destG", "type": "bytes12" },
            { "internalType": "uint64", "name": "t", "type": "uint64" },
            { "internalType": "bytes32", "name": "receiptHash", "type": "bytes32" }
        ],
        "name": "markDelivered",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "uint256", "name": "id", "type": "uint256" },
            {
                "components": [
                    { "internalType": "uint256", "name": "farmNftId", "type": "uint256" },
                    { "internalType": "bytes32", "name": "harvestId", "type": "bytes32" },
                    { "internalType": "string", "name": "product", "type": "string" },
                    { "internalType": "string", "name": "variety", "type": "string" },
                    { "internalType": "bytes32", "name": "unit", "type": "bytes32" },
                    { "internalType": "uint8", "name": "unitDecimals", "type": "uint8" },
                    { "internalType": "string", "name": "tokenURI", "type": "string" },
                    { "internalType": "bool", "name": "active", "type": "bool" }
                ],
                "internalType": "struct IAgroTrace1155.LotMeta",
                "name": "m",
                "type": "tuple"
            },
            { "internalType": "uint256", "name": "amount", "type": "uint256" },
            { "internalType": "address", "name": "owner", "type": "address" }
        ],
        "name": "mintLot",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "name": "parentOf",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "uint256", "name": "parent", "type": "uint256" },
            { "internalType": "uint256", "name": "child", "type": "uint256" },
            { "internalType": "uint256", "name": "inAmt", "type": "uint256" },
            { "internalType": "uint256", "name": "outAmt", "type": "uint256" },
            { "internalType": "bytes32", "name": "processType", "type": "bytes32" }
        ],
        "name": "processToChild",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "uint256", "name": "id", "type": "uint256" },
            { "internalType": "bytes12", "name": "place", "type": "bytes12" },
            { "internalType": "bytes32", "name": "docRefHash", "type": "bytes32" },
            { "internalType": "bytes32", "name": "sensorRoot", "type": "bytes32" },
            { "internalType": "uint64", "name": "time", "type": "uint64" }
        ],
        "name": "recordStop",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "registry",
        "outputs": [
            {
                "internalType": "contract IActorsRegistry",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "bytes32", "name": "role", "type": "bytes32" },
            {
                "internalType": "address",
                "name": "callerConfirmation",
                "type": "address"
            }
        ],
        "name": "renounceRole",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "bytes32", "name": "role", "type": "bytes32" },
            { "internalType": "address", "name": "account", "type": "address" }
        ],
        "name": "revokeRole",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "address", "name": "from", "type": "address" },
            { "internalType": "address", "name": "to", "type": "address" },
            { "internalType": "uint256[]", "name": "ids", "type": "uint256[]" },
            { "internalType": "uint256[]", "name": "amounts", "type": "uint256[]" },
            { "internalType": "bytes", "name": "data", "type": "bytes" }
        ],
        "name": "safeBatchTransferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "address", "name": "from", "type": "address" },
            { "internalType": "address", "name": "to", "type": "address" },
            { "internalType": "uint256", "name": "id", "type": "uint256" },
            { "internalType": "uint256", "name": "amount", "type": "uint256" },
            { "internalType": "bytes", "name": "data", "type": "bytes" }
        ],
        "name": "safeTransferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "address", "name": "operator", "type": "address" },
            { "internalType": "bool", "name": "approved", "type": "bool" }
        ],
        "name": "setApprovalForAll",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "uint256", "name": "id", "type": "uint256" },
            {
                "internalType": "enum IAgroTrace1155.LotState",
                "name": "s",
                "type": "uint8"
            },
            { "internalType": "uint64", "name": "t", "type": "uint64" }
        ],
        "name": "setState",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "uint256", "name": "id", "type": "uint256" },
            { "internalType": "string", "name": "newURI", "type": "string" }
        ],
        "name": "setTokenURI",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "uint256", "name": "parent", "type": "uint256" },
            { "internalType": "uint256", "name": "child", "type": "uint256" },
            { "internalType": "uint256", "name": "amount", "type": "uint256" }
        ],
        "name": "splitToChild",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "uint256", "name": "id", "type": "uint256" },
            {
                "internalType": "enum IAgroTrace1155.Stage",
                "name": "stage",
                "type": "uint8"
            },
            { "internalType": "uint64", "name": "time", "type": "uint64" },
            { "internalType": "bytes32", "name": "contentHash", "type": "bytes32" },
            { "internalType": "int32", "name": "avgT", "type": "int32" },
            { "internalType": "int32", "name": "lastT", "type": "int32" },
            { "internalType": "int32", "name": "avgH", "type": "int32" },
            { "internalType": "int32", "name": "lastH", "type": "int32" },
            { "internalType": "int32", "name": "avgSoil", "type": "int32" },
            { "internalType": "int32", "name": "lastSoil", "type": "int32" },
            { "internalType": "bytes32", "name": "sensorRoot", "type": "bytes32" }
        ],
        "name": "stageAnchor",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "name": "state",
        "outputs": [
            {
                "internalType": "enum IAgroTrace1155.LotState",
                "name": "",
                "type": "uint8"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "bytes4", "name": "iid", "type": "bytes4" }],
        "name": "supportsInterface",
        "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalSupply",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "uint256", "name": "id", "type": "uint256" }],
        "name": "totalSupply",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "uint256", "name": "id", "type": "uint256" }],
        "name": "uri",
        "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
        "stateMutability": "view",
        "type": "function"
    }
]

export const certificatesAbi = [
    {
        "inputs": [
            { "internalType": "address", "name": "actorsRegistry", "type": "address" }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "lotId",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "certKey",
                "type": "bytes32"
            },
            {
                "indexed": false,
                "internalType": "bytes32",
                "name": "certType",
                "type": "bytes32"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "issuer",
                "type": "address"
            }
        ],
        "name": "CertificateLinked",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "lotId",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "certKey",
                "type": "bytes32"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "reason",
                "type": "string"
            }
        ],
        "name": "CertificateRevoked",
        "type": "event"
    },
    {
        "inputs": [{ "internalType": "bytes32", "name": "key", "type": "bytes32" }],
        "name": "getByKey",
        "outputs": [
            {
                "components": [
                    { "internalType": "bytes32", "name": "certType", "type": "bytes32" },
                    { "internalType": "bytes32", "name": "docHash", "type": "bytes32" },
                    { "internalType": "address", "name": "issuer", "type": "address" },
                    { "internalType": "uint64", "name": "issuedAt", "type": "uint64" },
                    { "internalType": "uint64", "name": "expiresAt", "type": "uint64" },
                    { "internalType": "bool", "name": "revoked", "type": "bool" },
                    { "internalType": "bytes", "name": "sig", "type": "bytes" }
                ],
                "internalType": "struct ICertificates.Certificate",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "uint256", "name": "lotId", "type": "uint256" }
        ],
        "name": "getLotCertKeys",
        "outputs": [
            { "internalType": "bytes32[]", "name": "", "type": "bytes32[]" }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "bytes32", "name": "key", "type": "bytes32" },
            { "internalType": "uint64", "name": "nowTs", "type": "uint64" }
        ],
        "name": "isValid",
        "outputs": [
            { "internalType": "bool", "name": "ok", "type": "bool" },
            { "internalType": "string", "name": "why", "type": "string" }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "uint256", "name": "lotId", "type": "uint256" },
            { "internalType": "bytes32", "name": "certType", "type": "bytes32" },
            { "internalType": "bytes32", "name": "docHash", "type": "bytes32" },
            { "internalType": "address", "name": "issuer", "type": "address" },
            { "internalType": "uint64", "name": "issuedAt", "type": "uint64" },
            { "internalType": "uint64", "name": "expiresAt", "type": "uint64" }
        ],
        "name": "linkByRole",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "uint256", "name": "lotId", "type": "uint256" },
            { "internalType": "bytes32", "name": "certType", "type": "bytes32" },
            { "internalType": "bytes32", "name": "docHash", "type": "bytes32" },
            { "internalType": "address", "name": "issuer", "type": "address" },
            { "internalType": "uint64", "name": "issuedAt", "type": "uint64" },
            { "internalType": "uint64", "name": "expiresAt", "type": "uint64" },
            { "internalType": "bytes", "name": "sig", "type": "bytes" },
            { "internalType": "bytes32", "name": "msgHash", "type": "bytes32" }
        ],
        "name": "linkSigned",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "registry",
        "outputs": [
            {
                "internalType": "contract IActorsRegistry",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "uint256", "name": "lotId", "type": "uint256" },
            { "internalType": "bytes32", "name": "certKey", "type": "bytes32" },
            { "internalType": "string", "name": "reason", "type": "string" }
        ],
        "name": "revoke",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]


export const farmNFTAbi = [
    {
        "type": "constructor",
        "inputs": [
            { "name": "admin", "type": "address", "internalType": "address" }
        ],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "DEFAULT_ADMIN_ROLE",
        "inputs": [],
        "outputs": [{ "name": "", "type": "bytes32", "internalType": "bytes32" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "FARM_ADMIN_ROLE",
        "inputs": [],
        "outputs": [{ "name": "", "type": "bytes32", "internalType": "bytes32" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "FARM_MINTER_ROLE",
        "inputs": [],
        "outputs": [{ "name": "", "type": "bytes32", "internalType": "bytes32" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "approve",
        "inputs": [
            { "name": "to", "type": "address", "internalType": "address" },
            { "name": "tokenId", "type": "uint256", "internalType": "uint256" }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "balanceOf",
        "inputs": [
            { "name": "owner", "type": "address", "internalType": "address" }
        ],
        "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "exists",
        "inputs": [
            { "name": "tokenId", "type": "uint256", "internalType": "uint256" }
        ],
        "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "farm",
        "inputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
        "outputs": [
            { "name": "name", "type": "string", "internalType": "string" },
            { "name": "region", "type": "string", "internalType": "string" },
            { "name": "countryISO", "type": "string", "internalType": "string" },
            { "name": "geohash", "type": "bytes12", "internalType": "bytes12" },
            { "name": "cropFocus", "type": "string", "internalType": "string" },
            { "name": "photoURI", "type": "string", "internalType": "string" },
            { "name": "metaURI", "type": "string", "internalType": "string" }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getApproved",
        "inputs": [
            { "name": "tokenId", "type": "uint256", "internalType": "uint256" }
        ],
        "outputs": [{ "name": "", "type": "address", "internalType": "address" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getRoleAdmin",
        "inputs": [
            { "name": "role", "type": "bytes32", "internalType": "bytes32" }
        ],
        "outputs": [{ "name": "", "type": "bytes32", "internalType": "bytes32" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "grantRole",
        "inputs": [
            { "name": "role", "type": "bytes32", "internalType": "bytes32" },
            { "name": "account", "type": "address", "internalType": "address" }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "hasRole",
        "inputs": [
            { "name": "role", "type": "bytes32", "internalType": "bytes32" },
            { "name": "account", "type": "address", "internalType": "address" }
        ],
        "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "isApprovedForAll",
        "inputs": [
            { "name": "owner", "type": "address", "internalType": "address" },
            { "name": "operator", "type": "address", "internalType": "address" }
        ],
        "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "name",
        "inputs": [],
        "outputs": [{ "name": "", "type": "string", "internalType": "string" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "ownerOf",
        "inputs": [
            { "name": "tokenId", "type": "uint256", "internalType": "uint256" }
        ],
        "outputs": [{ "name": "", "type": "address", "internalType": "address" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "registerFarm",
        "inputs": [
            { "name": "tokenId", "type": "uint256", "internalType": "uint256" },
            { "name": "owner", "type": "address", "internalType": "address" },
            {
                "name": "data",
                "type": "tuple",
                "internalType": "struct FarmNFT.FarmData",
                "components": [
                    { "name": "name", "type": "string", "internalType": "string" },
                    { "name": "region", "type": "string", "internalType": "string" },
                    {
                        "name": "countryISO",
                        "type": "string",
                        "internalType": "string"
                    },
                    { "name": "geohash", "type": "bytes12", "internalType": "bytes12" },
                    { "name": "cropFocus", "type": "string", "internalType": "string" },
                    { "name": "photoURI", "type": "string", "internalType": "string" },
                    { "name": "metaURI", "type": "string", "internalType": "string" }
                ]
            },
            { "name": "tokenURI_", "type": "string", "internalType": "string" }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "renounceRole",
        "inputs": [
            { "name": "role", "type": "bytes32", "internalType": "bytes32" },
            {
                "name": "callerConfirmation",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "revokeRole",
        "inputs": [
            { "name": "role", "type": "bytes32", "internalType": "bytes32" },
            { "name": "account", "type": "address", "internalType": "address" }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "safeTransferFrom",
        "inputs": [
            { "name": "from", "type": "address", "internalType": "address" },
            { "name": "to", "type": "address", "internalType": "address" },
            { "name": "tokenId", "type": "uint256", "internalType": "uint256" }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "safeTransferFrom",
        "inputs": [
            { "name": "from", "type": "address", "internalType": "address" },
            { "name": "to", "type": "address", "internalType": "address" },
            { "name": "tokenId", "type": "uint256", "internalType": "uint256" },
            { "name": "data", "type": "bytes", "internalType": "bytes" }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "setApprovalForAll",
        "inputs": [
            { "name": "operator", "type": "address", "internalType": "address" },
            { "name": "approved", "type": "bool", "internalType": "bool" }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "supportsInterface",
        "inputs": [{ "name": "iid", "type": "bytes4", "internalType": "bytes4" }],
        "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "symbol",
        "inputs": [],
        "outputs": [{ "name": "", "type": "string", "internalType": "string" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "tokenURI",
        "inputs": [
            { "name": "tokenId", "type": "uint256", "internalType": "uint256" }
        ],
        "outputs": [{ "name": "", "type": "string", "internalType": "string" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "transferFrom",
        "inputs": [
            { "name": "from", "type": "address", "internalType": "address" },
            { "name": "to", "type": "address", "internalType": "address" },
            { "name": "tokenId", "type": "uint256", "internalType": "uint256" }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "updateFarm",
        "inputs": [
            { "name": "tokenId", "type": "uint256", "internalType": "uint256" },
            {
                "name": "data",
                "type": "tuple",
                "internalType": "struct FarmNFT.FarmData",
                "components": [
                    { "name": "name", "type": "string", "internalType": "string" },
                    { "name": "region", "type": "string", "internalType": "string" },
                    {
                        "name": "countryISO",
                        "type": "string",
                        "internalType": "string"
                    },
                    { "name": "geohash", "type": "bytes12", "internalType": "bytes12" },
                    { "name": "cropFocus", "type": "string", "internalType": "string" },
                    { "name": "photoURI", "type": "string", "internalType": "string" },
                    { "name": "metaURI", "type": "string", "internalType": "string" }
                ]
            },
            { "name": "newTokenURI", "type": "string", "internalType": "string" }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "event",
        "name": "Approval",
        "inputs": [
            {
                "name": "owner",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "approved",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "tokenId",
                "type": "uint256",
                "indexed": true,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "ApprovalForAll",
        "inputs": [
            {
                "name": "owner",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "operator",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "approved",
                "type": "bool",
                "indexed": false,
                "internalType": "bool"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "BatchMetadataUpdate",
        "inputs": [
            {
                "name": "_fromTokenId",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "_toTokenId",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "FarmRegistered",
        "inputs": [
            {
                "name": "farmNftId",
                "type": "uint256",
                "indexed": true,
                "internalType": "uint256"
            },
            {
                "name": "owner",
                "type": "address",
                "indexed": false,
                "internalType": "address"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "FarmUpdated",
        "inputs": [
            {
                "name": "farmNftId",
                "type": "uint256",
                "indexed": true,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "MetadataUpdate",
        "inputs": [
            {
                "name": "_tokenId",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "RoleAdminChanged",
        "inputs": [
            {
                "name": "role",
                "type": "bytes32",
                "indexed": true,
                "internalType": "bytes32"
            },
            {
                "name": "previousAdminRole",
                "type": "bytes32",
                "indexed": true,
                "internalType": "bytes32"
            },
            {
                "name": "newAdminRole",
                "type": "bytes32",
                "indexed": true,
                "internalType": "bytes32"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "RoleGranted",
        "inputs": [
            {
                "name": "role",
                "type": "bytes32",
                "indexed": true,
                "internalType": "bytes32"
            },
            {
                "name": "account",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "sender",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "RoleRevoked",
        "inputs": [
            {
                "name": "role",
                "type": "bytes32",
                "indexed": true,
                "internalType": "bytes32"
            },
            {
                "name": "account",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "sender",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "Transfer",
        "inputs": [
            {
                "name": "from",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "to",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "tokenId",
                "type": "uint256",
                "indexed": true,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    { "type": "error", "name": "AccessControlBadConfirmation", "inputs": [] },
    {
        "type": "error",
        "name": "AccessControlUnauthorizedAccount",
        "inputs": [
            { "name": "account", "type": "address", "internalType": "address" },
            { "name": "neededRole", "type": "bytes32", "internalType": "bytes32" }
        ]
    },
    {
        "type": "error",
        "name": "ERC721IncorrectOwner",
        "inputs": [
            { "name": "sender", "type": "address", "internalType": "address" },
            { "name": "tokenId", "type": "uint256", "internalType": "uint256" },
            { "name": "owner", "type": "address", "internalType": "address" }
        ]
    },
    {
        "type": "error",
        "name": "ERC721InsufficientApproval",
        "inputs": [
            { "name": "operator", "type": "address", "internalType": "address" },
            { "name": "tokenId", "type": "uint256", "internalType": "uint256" }
        ]
    },
    {
        "type": "error",
        "name": "ERC721InvalidApprover",
        "inputs": [
            { "name": "approver", "type": "address", "internalType": "address" }
        ]
    },
    {
        "type": "error",
        "name": "ERC721InvalidOperator",
        "inputs": [
            { "name": "operator", "type": "address", "internalType": "address" }
        ]
    },
    {
        "type": "error",
        "name": "ERC721InvalidOwner",
        "inputs": [
            { "name": "owner", "type": "address", "internalType": "address" }
        ]
    },
    {
        "type": "error",
        "name": "ERC721InvalidReceiver",
        "inputs": [
            { "name": "receiver", "type": "address", "internalType": "address" }
        ]
    },
    {
        "type": "error",
        "name": "ERC721InvalidSender",
        "inputs": [
            { "name": "sender", "type": "address", "internalType": "address" }
        ]
    },
    {
        "type": "error",
        "name": "ERC721NonexistentToken",
        "inputs": [
            { "name": "tokenId", "type": "uint256", "internalType": "uint256" }
        ]
    }
]

