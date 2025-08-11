
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


export const ACTORS_REGISTRY_ADDRESS = "0xCE1E62a3F4fD5Df7645E149192bA709149387B57"
export const FARM_NFT_ADDRESS = "0x15959d32a1dcD2ebD0E7c957B14217ef86F091C5"
export const CERTIFICATES_ADDRESS = "0x36bfdb2999a3c2adb5405c7fdd8430fe1b7b83d8"
export const AGROTRACE_ADDRESS = "0xfce8d6510898854508c8f8d494e5595ed0a40184"

export const actorsRegistryAbi = [
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
        "name": "REGISTRY_ADMIN_ROLE",
        "inputs": [],
        "outputs": [{ "name": "", "type": "bytes32", "internalType": "bytes32" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "ROLE_INSPECTOR",
        "inputs": [],
        "outputs": [{ "name": "", "type": "bytes32", "internalType": "bytes32" }],
        "stateMutability": "pure"
    },
    {
        "type": "function",
        "name": "ROLE_PROCESSOR",
        "inputs": [],
        "outputs": [{ "name": "", "type": "bytes32", "internalType": "bytes32" }],
        "stateMutability": "pure"
    },
    {
        "type": "function",
        "name": "ROLE_PRODUCER",
        "inputs": [],
        "outputs": [{ "name": "", "type": "bytes32", "internalType": "bytes32" }],
        "stateMutability": "pure"
    },
    {
        "type": "function",
        "name": "ROLE_RETAILER",
        "inputs": [],
        "outputs": [{ "name": "", "type": "bytes32", "internalType": "bytes32" }],
        "stateMutability": "pure"
    },
    {
        "type": "function",
        "name": "ROLE_TRANSPORTER",
        "inputs": [],
        "outputs": [{ "name": "", "type": "bytes32", "internalType": "bytes32" }],
        "stateMutability": "pure"
    },
    {
        "type": "function",
        "name": "addActor",
        "inputs": [
            { "name": "who", "type": "address", "internalType": "address" },
            { "name": "orgName", "type": "string", "internalType": "string" },
            { "name": "did", "type": "string", "internalType": "string" },
            { "name": "metaURI", "type": "string", "internalType": "string" },
            { "name": "active", "type": "bool", "internalType": "bool" }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "getActor",
        "inputs": [
            { "name": "who", "type": "address", "internalType": "address" }
        ],
        "outputs": [
            { "name": "", "type": "string", "internalType": "string" },
            { "name": "", "type": "string", "internalType": "string" },
            { "name": "", "type": "string", "internalType": "string" },
            { "name": "", "type": "bool", "internalType": "bool" }
        ],
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
        "name": "grantRoleFor",
        "inputs": [
            { "name": "who", "type": "address", "internalType": "address" },
            { "name": "role_", "type": "bytes32", "internalType": "bytes32" }
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
        "name": "hasRole",
        "inputs": [
            { "name": "who", "type": "address", "internalType": "address" },
            { "name": "role_", "type": "bytes32", "internalType": "bytes32" }
        ],
        "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "isActive",
        "inputs": [
            { "name": "who", "type": "address", "internalType": "address" }
        ],
        "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
        "stateMutability": "view"
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
        "name": "revokeRoleFor",
        "inputs": [
            { "name": "who", "type": "address", "internalType": "address" },
            { "name": "role_", "type": "bytes32", "internalType": "bytes32" }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "supportsInterface",
        "inputs": [
            { "name": "interfaceId", "type": "bytes4", "internalType": "bytes4" }
        ],
        "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "updateActor",
        "inputs": [
            { "name": "who", "type": "address", "internalType": "address" },
            { "name": "orgName", "type": "string", "internalType": "string" },
            { "name": "did", "type": "string", "internalType": "string" },
            { "name": "metaURI", "type": "string", "internalType": "string" },
            { "name": "active", "type": "bool", "internalType": "bool" }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "event",
        "name": "ActorActivation",
        "inputs": [
            {
                "name": "who",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "active",
                "type": "bool",
                "indexed": false,
                "internalType": "bool"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "ActorAdded",
        "inputs": [
            {
                "name": "who",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "orgName",
                "type": "string",
                "indexed": false,
                "internalType": "string"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "ActorUpdated",
        "inputs": [
            {
                "name": "who",
                "type": "address",
                "indexed": true,
                "internalType": "address"
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
        "name": "RoleGrantedExt",
        "inputs": [
            {
                "name": "who",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "role",
                "type": "bytes32",
                "indexed": true,
                "internalType": "bytes32"
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
        "name": "RoleRevokedExt",
        "inputs": [
            {
                "name": "who",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "role",
                "type": "bytes32",
                "indexed": true,
                "internalType": "bytes32"
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
    }
]

export const agroTraceAbi = [
    {
        "type": "constructor",
        "inputs": [
            { "name": "baseURI", "type": "string", "internalType": "string" },
            { "name": "farmNFT_", "type": "address", "internalType": "address" },
            {
                "name": "actorsRegistry_",
                "type": "address",
                "internalType": "address"
            },
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
        "name": "ROLE_RETAILER",
        "inputs": [],
        "outputs": [{ "name": "", "type": "bytes32", "internalType": "bytes32" }],
        "stateMutability": "pure"
    },
    {
        "type": "function",
        "name": "appendSensorRoot",
        "inputs": [
            { "name": "id", "type": "uint256", "internalType": "uint256" },
            { "name": "root", "type": "bytes32", "internalType": "bytes32" },
            { "name": "t0", "type": "uint64", "internalType": "uint64" },
            { "name": "t1", "type": "uint64", "internalType": "uint64" }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "balanceOf",
        "inputs": [
            { "name": "account", "type": "address", "internalType": "address" },
            { "name": "id", "type": "uint256", "internalType": "uint256" }
        ],
        "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "balanceOfBatch",
        "inputs": [
            {
                "name": "accounts",
                "type": "address[]",
                "internalType": "address[]"
            },
            { "name": "ids", "type": "uint256[]", "internalType": "uint256[]" }
        ],
        "outputs": [
            { "name": "", "type": "uint256[]", "internalType": "uint256[]" }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "burn",
        "inputs": [
            { "name": "account", "type": "address", "internalType": "address" },
            { "name": "id", "type": "uint256", "internalType": "uint256" },
            { "name": "value", "type": "uint256", "internalType": "uint256" }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "burnBatch",
        "inputs": [
            { "name": "account", "type": "address", "internalType": "address" },
            { "name": "ids", "type": "uint256[]", "internalType": "uint256[]" },
            { "name": "values", "type": "uint256[]", "internalType": "uint256[]" }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "createHarvest",
        "inputs": [
            { "name": "farmNftId", "type": "uint256", "internalType": "uint256" },
            { "name": "product", "type": "string", "internalType": "string" },
            { "name": "startDate", "type": "uint64", "internalType": "uint64" },
            { "name": "season", "type": "uint64", "internalType": "uint64" },
            { "name": "seq", "type": "uint64", "internalType": "uint64" }
        ],
        "outputs": [
            { "name": "harvestId", "type": "bytes32", "internalType": "bytes32" }
        ],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "declareRoute",
        "inputs": [
            { "name": "id", "type": "uint256", "internalType": "uint256" },
            { "name": "fromG", "type": "bytes12", "internalType": "bytes12" },
            { "name": "toG", "type": "bytes12", "internalType": "bytes12" },
            { "name": "carrier", "type": "address", "internalType": "address" },
            { "name": "eta", "type": "uint64", "internalType": "uint64" }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "exists",
        "inputs": [
            { "name": "id", "type": "uint256", "internalType": "uint256" }
        ],
        "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "farmNft",
        "inputs": [],
        "outputs": [
            { "name": "", "type": "address", "internalType": "contract IFarmNFT" }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getChildren",
        "inputs": [
            { "name": "parent", "type": "uint256", "internalType": "uint256" }
        ],
        "outputs": [
            { "name": "", "type": "uint256[]", "internalType": "uint256[]" }
        ],
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
        "name": "harvestLots",
        "inputs": [
            { "name": "hId", "type": "bytes32", "internalType": "bytes32" },
            { "name": "idx", "type": "uint256", "internalType": "uint256" }
        ],
        "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
        "stateMutability": "view"
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
            { "name": "account", "type": "address", "internalType": "address" },
            { "name": "operator", "type": "address", "internalType": "address" }
        ],
        "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "lot",
        "inputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
        "outputs": [
            { "name": "farmNftId", "type": "uint256", "internalType": "uint256" },
            { "name": "harvestId", "type": "bytes32", "internalType": "bytes32" },
            { "name": "product", "type": "string", "internalType": "string" },
            { "name": "variety", "type": "string", "internalType": "string" },
            { "name": "unit", "type": "bytes32", "internalType": "bytes32" },
            { "name": "unitDecimals", "type": "uint8", "internalType": "uint8" },
            { "name": "tokenURI", "type": "string", "internalType": "string" },
            { "name": "active", "type": "bool", "internalType": "bool" }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "markDelivered",
        "inputs": [
            { "name": "id", "type": "uint256", "internalType": "uint256" },
            { "name": "destG", "type": "bytes12", "internalType": "bytes12" },
            { "name": "t", "type": "uint64", "internalType": "uint64" },
            { "name": "receiptHash", "type": "bytes32", "internalType": "bytes32" }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "mintLot",
        "inputs": [
            { "name": "id", "type": "uint256", "internalType": "uint256" },
            {
                "name": "m",
                "type": "tuple",
                "internalType": "struct IAgroTrace1155.LotMeta",
                "components": [
                    {
                        "name": "farmNftId",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "harvestId",
                        "type": "bytes32",
                        "internalType": "bytes32"
                    },
                    { "name": "product", "type": "string", "internalType": "string" },
                    { "name": "variety", "type": "string", "internalType": "string" },
                    { "name": "unit", "type": "bytes32", "internalType": "bytes32" },
                    {
                        "name": "unitDecimals",
                        "type": "uint8",
                        "internalType": "uint8"
                    },
                    { "name": "tokenURI", "type": "string", "internalType": "string" },
                    { "name": "active", "type": "bool", "internalType": "bool" }
                ]
            },
            { "name": "amount", "type": "uint256", "internalType": "uint256" },
            { "name": "owner", "type": "address", "internalType": "address" }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "parentOf",
        "inputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
        "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "processToChild",
        "inputs": [
            { "name": "parent", "type": "uint256", "internalType": "uint256" },
            { "name": "child", "type": "uint256", "internalType": "uint256" },
            { "name": "inAmt", "type": "uint256", "internalType": "uint256" },
            { "name": "outAmt", "type": "uint256", "internalType": "uint256" },
            { "name": "processType", "type": "bytes32", "internalType": "bytes32" }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "recordStop",
        "inputs": [
            { "name": "id", "type": "uint256", "internalType": "uint256" },
            { "name": "place", "type": "bytes12", "internalType": "bytes12" },
            { "name": "docRefHash", "type": "bytes32", "internalType": "bytes32" },
            { "name": "sensorRoot", "type": "bytes32", "internalType": "bytes32" },
            { "name": "time", "type": "uint64", "internalType": "uint64" }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "registry",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "contract IActorsRegistry"
            }
        ],
        "stateMutability": "view"
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
        "name": "safeBatchTransferFrom",
        "inputs": [
            { "name": "from", "type": "address", "internalType": "address" },
            { "name": "to", "type": "address", "internalType": "address" },
            { "name": "ids", "type": "uint256[]", "internalType": "uint256[]" },
            { "name": "amounts", "type": "uint256[]", "internalType": "uint256[]" },
            { "name": "data", "type": "bytes", "internalType": "bytes" }
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
            { "name": "id", "type": "uint256", "internalType": "uint256" },
            { "name": "amount", "type": "uint256", "internalType": "uint256" },
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
        "name": "setState",
        "inputs": [
            { "name": "id", "type": "uint256", "internalType": "uint256" },
            {
                "name": "s",
                "type": "uint8",
                "internalType": "enum IAgroTrace1155.LotState"
            },
            { "name": "t", "type": "uint64", "internalType": "uint64" }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "setTokenURI",
        "inputs": [
            { "name": "id", "type": "uint256", "internalType": "uint256" },
            { "name": "newURI", "type": "string", "internalType": "string" }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "splitToChild",
        "inputs": [
            { "name": "parent", "type": "uint256", "internalType": "uint256" },
            { "name": "child", "type": "uint256", "internalType": "uint256" },
            { "name": "amount", "type": "uint256", "internalType": "uint256" }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "stageAnchor",
        "inputs": [
            { "name": "id", "type": "uint256", "internalType": "uint256" },
            {
                "name": "stage",
                "type": "uint8",
                "internalType": "enum IAgroTrace1155.Stage"
            },
            { "name": "time", "type": "uint64", "internalType": "uint64" },
            { "name": "contentHash", "type": "bytes32", "internalType": "bytes32" },
            { "name": "avgT", "type": "int32", "internalType": "int32" },
            { "name": "lastT", "type": "int32", "internalType": "int32" },
            { "name": "avgH", "type": "int32", "internalType": "int32" },
            { "name": "lastH", "type": "int32", "internalType": "int32" },
            { "name": "avgSoil", "type": "int32", "internalType": "int32" },
            { "name": "lastSoil", "type": "int32", "internalType": "int32" },
            { "name": "sensorRoot", "type": "bytes32", "internalType": "bytes32" }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "state",
        "inputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
        "outputs": [
            {
                "name": "",
                "type": "uint8",
                "internalType": "enum IAgroTrace1155.LotState"
            }
        ],
        "stateMutability": "view"
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
        "name": "totalSupply",
        "inputs": [],
        "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "totalSupply",
        "inputs": [
            { "name": "id", "type": "uint256", "internalType": "uint256" }
        ],
        "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "uri",
        "inputs": [
            { "name": "id", "type": "uint256", "internalType": "uint256" }
        ],
        "outputs": [{ "name": "", "type": "string", "internalType": "string" }],
        "stateMutability": "view"
    },
    {
        "type": "event",
        "name": "ApprovalForAll",
        "inputs": [
            {
                "name": "account",
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
        "name": "Delivered",
        "inputs": [
            {
                "name": "lotId",
                "type": "uint256",
                "indexed": true,
                "internalType": "uint256"
            },
            {
                "name": "destinationGeohash",
                "type": "bytes12",
                "indexed": false,
                "internalType": "bytes12"
            },
            {
                "name": "deliveredAt",
                "type": "uint64",
                "indexed": false,
                "internalType": "uint64"
            },
            {
                "name": "receiptHash",
                "type": "bytes32",
                "indexed": false,
                "internalType": "bytes32"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "HarvestCreated",
        "inputs": [
            {
                "name": "harvestId",
                "type": "bytes32",
                "indexed": true,
                "internalType": "bytes32"
            },
            {
                "name": "farmNftId",
                "type": "uint256",
                "indexed": true,
                "internalType": "uint256"
            },
            {
                "name": "product",
                "type": "string",
                "indexed": false,
                "internalType": "string"
            },
            {
                "name": "startDate",
                "type": "uint64",
                "indexed": false,
                "internalType": "uint64"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "LotDerived",
        "inputs": [
            {
                "name": "parent",
                "type": "uint256",
                "indexed": true,
                "internalType": "uint256"
            },
            {
                "name": "child",
                "type": "uint256",
                "indexed": true,
                "internalType": "uint256"
            },
            {
                "name": "amountIn",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "amountOut",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "processType",
                "type": "bytes32",
                "indexed": false,
                "internalType": "bytes32"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "LotMinted",
        "inputs": [
            {
                "name": "id",
                "type": "uint256",
                "indexed": true,
                "internalType": "uint256"
            },
            {
                "name": "harvestId",
                "type": "bytes32",
                "indexed": true,
                "internalType": "bytes32"
            },
            {
                "name": "amount",
                "type": "uint256",
                "indexed": false,
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
        "name": "RouteDeclared",
        "inputs": [
            {
                "name": "lotId",
                "type": "uint256",
                "indexed": true,
                "internalType": "uint256"
            },
            {
                "name": "fromGeohash",
                "type": "bytes12",
                "indexed": false,
                "internalType": "bytes12"
            },
            {
                "name": "toGeohash",
                "type": "bytes12",
                "indexed": false,
                "internalType": "bytes12"
            },
            {
                "name": "carrier",
                "type": "address",
                "indexed": false,
                "internalType": "address"
            },
            {
                "name": "eta",
                "type": "uint64",
                "indexed": false,
                "internalType": "uint64"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "StageAnchored",
        "inputs": [
            {
                "name": "lotId",
                "type": "uint256",
                "indexed": true,
                "internalType": "uint256"
            },
            {
                "name": "stage",
                "type": "uint8",
                "indexed": true,
                "internalType": "enum IAgroTrace1155.Stage"
            },
            {
                "name": "time",
                "type": "uint64",
                "indexed": false,
                "internalType": "uint64"
            },
            {
                "name": "contentHash",
                "type": "bytes32",
                "indexed": false,
                "internalType": "bytes32"
            },
            {
                "name": "avgTemp_cDeci",
                "type": "int32",
                "indexed": false,
                "internalType": "int32"
            },
            {
                "name": "lastTemp_cDeci",
                "type": "int32",
                "indexed": false,
                "internalType": "int32"
            },
            {
                "name": "avgHumRel_pDeci",
                "type": "int32",
                "indexed": false,
                "internalType": "int32"
            },
            {
                "name": "lastHumRel_pDeci",
                "type": "int32",
                "indexed": false,
                "internalType": "int32"
            },
            {
                "name": "avgSoilMoist_pDeci",
                "type": "int32",
                "indexed": false,
                "internalType": "int32"
            },
            {
                "name": "lastSoilMoist_pDeci",
                "type": "int32",
                "indexed": false,
                "internalType": "int32"
            },
            {
                "name": "sensorRoot",
                "type": "bytes32",
                "indexed": false,
                "internalType": "bytes32"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "StateChanged",
        "inputs": [
            {
                "name": "id",
                "type": "uint256",
                "indexed": true,
                "internalType": "uint256"
            },
            {
                "name": "newState",
                "type": "uint8",
                "indexed": false,
                "internalType": "enum IAgroTrace1155.LotState"
            },
            {
                "name": "time",
                "type": "uint64",
                "indexed": false,
                "internalType": "uint64"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "StopRecorded",
        "inputs": [
            {
                "name": "lotId",
                "type": "uint256",
                "indexed": true,
                "internalType": "uint256"
            },
            {
                "name": "placeGeohash",
                "type": "bytes12",
                "indexed": false,
                "internalType": "bytes12"
            },
            {
                "name": "actor",
                "type": "address",
                "indexed": false,
                "internalType": "address"
            },
            {
                "name": "time",
                "type": "uint64",
                "indexed": false,
                "internalType": "uint64"
            },
            {
                "name": "docRefHash",
                "type": "bytes32",
                "indexed": false,
                "internalType": "bytes32"
            },
            {
                "name": "sensorRoot",
                "type": "bytes32",
                "indexed": false,
                "internalType": "bytes32"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "TransferBatch",
        "inputs": [
            {
                "name": "operator",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
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
                "name": "ids",
                "type": "uint256[]",
                "indexed": false,
                "internalType": "uint256[]"
            },
            {
                "name": "values",
                "type": "uint256[]",
                "indexed": false,
                "internalType": "uint256[]"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "TransferSingle",
        "inputs": [
            {
                "name": "operator",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
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
                "name": "id",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "value",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "URI",
        "inputs": [
            {
                "name": "value",
                "type": "string",
                "indexed": false,
                "internalType": "string"
            },
            {
                "name": "id",
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
        "name": "ERC1155InsufficientBalance",
        "inputs": [
            { "name": "sender", "type": "address", "internalType": "address" },
            { "name": "balance", "type": "uint256", "internalType": "uint256" },
            { "name": "needed", "type": "uint256", "internalType": "uint256" },
            { "name": "tokenId", "type": "uint256", "internalType": "uint256" }
        ]
    },
    {
        "type": "error",
        "name": "ERC1155InvalidApprover",
        "inputs": [
            { "name": "approver", "type": "address", "internalType": "address" }
        ]
    },
    {
        "type": "error",
        "name": "ERC1155InvalidArrayLength",
        "inputs": [
            { "name": "idsLength", "type": "uint256", "internalType": "uint256" },
            { "name": "valuesLength", "type": "uint256", "internalType": "uint256" }
        ]
    },
    {
        "type": "error",
        "name": "ERC1155InvalidOperator",
        "inputs": [
            { "name": "operator", "type": "address", "internalType": "address" }
        ]
    },
    {
        "type": "error",
        "name": "ERC1155InvalidReceiver",
        "inputs": [
            { "name": "receiver", "type": "address", "internalType": "address" }
        ]
    },
    {
        "type": "error",
        "name": "ERC1155InvalidSender",
        "inputs": [
            { "name": "sender", "type": "address", "internalType": "address" }
        ]
    },
    {
        "type": "error",
        "name": "ERC1155MissingApprovalForAll",
        "inputs": [
            { "name": "operator", "type": "address", "internalType": "address" },
            { "name": "owner", "type": "address", "internalType": "address" }
        ]
    }
]

export const certificatesAbi = [
    {
        "type": "constructor",
        "inputs": [
            {
                "name": "actorsRegistry",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "getByKey",
        "inputs": [
            { "name": "key", "type": "bytes32", "internalType": "bytes32" }
        ],
        "outputs": [
            {
                "name": "",
                "type": "tuple",
                "internalType": "struct ICertificates.Certificate",
                "components": [
                    {
                        "name": "certType",
                        "type": "bytes32",
                        "internalType": "bytes32"
                    },
                    { "name": "docHash", "type": "bytes32", "internalType": "bytes32" },
                    { "name": "issuer", "type": "address", "internalType": "address" },
                    { "name": "issuedAt", "type": "uint64", "internalType": "uint64" },
                    { "name": "expiresAt", "type": "uint64", "internalType": "uint64" },
                    { "name": "revoked", "type": "bool", "internalType": "bool" },
                    { "name": "sig", "type": "bytes", "internalType": "bytes" }
                ]
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getLotCertKeys",
        "inputs": [
            { "name": "lotId", "type": "uint256", "internalType": "uint256" }
        ],
        "outputs": [
            { "name": "", "type": "bytes32[]", "internalType": "bytes32[]" }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "isValid",
        "inputs": [
            { "name": "key", "type": "bytes32", "internalType": "bytes32" },
            { "name": "nowTs", "type": "uint64", "internalType": "uint64" }
        ],
        "outputs": [
            { "name": "ok", "type": "bool", "internalType": "bool" },
            { "name": "why", "type": "string", "internalType": "string" }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "linkByRole",
        "inputs": [
            { "name": "lotId", "type": "uint256", "internalType": "uint256" },
            { "name": "certType", "type": "bytes32", "internalType": "bytes32" },
            { "name": "docHash", "type": "bytes32", "internalType": "bytes32" },
            { "name": "issuer", "type": "address", "internalType": "address" },
            { "name": "issuedAt", "type": "uint64", "internalType": "uint64" },
            { "name": "expiresAt", "type": "uint64", "internalType": "uint64" }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "linkSigned",
        "inputs": [
            { "name": "lotId", "type": "uint256", "internalType": "uint256" },
            { "name": "certType", "type": "bytes32", "internalType": "bytes32" },
            { "name": "docHash", "type": "bytes32", "internalType": "bytes32" },
            { "name": "issuer", "type": "address", "internalType": "address" },
            { "name": "issuedAt", "type": "uint64", "internalType": "uint64" },
            { "name": "expiresAt", "type": "uint64", "internalType": "uint64" },
            { "name": "sig", "type": "bytes", "internalType": "bytes" },
            { "name": "msgHash", "type": "bytes32", "internalType": "bytes32" }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "registry",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "contract IActorsRegistry"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "revoke",
        "inputs": [
            { "name": "lotId", "type": "uint256", "internalType": "uint256" },
            { "name": "certKey", "type": "bytes32", "internalType": "bytes32" },
            { "name": "reason", "type": "string", "internalType": "string" }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "event",
        "name": "CertificateLinked",
        "inputs": [
            {
                "name": "lotId",
                "type": "uint256",
                "indexed": true,
                "internalType": "uint256"
            },
            {
                "name": "certKey",
                "type": "bytes32",
                "indexed": true,
                "internalType": "bytes32"
            },
            {
                "name": "certType",
                "type": "bytes32",
                "indexed": false,
                "internalType": "bytes32"
            },
            {
                "name": "issuer",
                "type": "address",
                "indexed": false,
                "internalType": "address"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "CertificateRevoked",
        "inputs": [
            {
                "name": "lotId",
                "type": "uint256",
                "indexed": true,
                "internalType": "uint256"
            },
            {
                "name": "certKey",
                "type": "bytes32",
                "indexed": true,
                "internalType": "bytes32"
            },
            {
                "name": "reason",
                "type": "string",
                "indexed": false,
                "internalType": "string"
            }
        ],
        "anonymous": false
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

