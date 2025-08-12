import { publicClient } from "@/utils/client"
import { agroTraceContract } from "@/utils/constants"
import { parseAbiItem } from "viem"


interface TraceabilityViewProps {
    lotId: string
}

export default function Trace({ lotId }: TraceabilityViewProps) {

    const Delivered = await publicClient.getLogs({
        fromBlock: BigInt(8958496),
        address: agroTraceContract.address,
        event: parseAbiItem("event Delivered(uint256 indexed lotId, bytes12 destinationGeohash, uint64 deliveredAt, bytes32 receiptHash)"),
        args: {
            lotId: BigInt(lotId)
        },

    })

    const StageAnchored = await publicClient.getLogs({
        fromBlock: BigInt(8958496),
        address: agroTraceContract.address,
        event: {
            name: "StageAnchored",
            type: "event",
            inputs: [
                {
                    indexed: true,
                    name: "lotId",
                    type: "uint256"
                },
                {
                    indexed: true,
                    name: "stage",
                    type: "uint8"
                },
                {
                    indexed: false,
                    name: "time",
                    type: "uint64"
                },
                {
                    indexed: false,
                    name: "contentHash",
                    type: "bytes32"
                },
                {
                    indexed: false,
                    name: "avgTemp_cDeci",
                    type: "int32"
                },
                {
                    indexed: false,
                    name: "lastTemp_cDeci",
                    type: "int32"
                },
                {
                    indexed: false,
                    name: "avgHumRel_pDeci",
                    type: "int32"
                },
                {
                    indexed: false,
                    name: "lastHumRel_pDeci",
                    type: "int32"
                },
                {
                    indexed: false,
                    name: "avgSoilMoist_pDeci",
                    type: "int32"
                },
                {
                    indexed: false,
                    name: "lastSoilMoist_pDeci",
                    type: "int32"
                },
                {
                    indexed: false,
                    name: "sensorRoot",
                    type: "bytes32"
                }
            ]

        },
        args: {
            lotId: BigInt(lotId)
        },
    })

    const StateChanged = await publicClient.getLogs({
        fromBlock: BigInt(8958496),
        address: agroTraceContract.address,
        event: {
            "inputs": [
                {
                    indexed: true,
                    name: "id",
                    type: "uint256"
                },
                {
                    indexed: false,
                    name: "newState",
                    type: "uint8"
                },
                {
                    indexed: false,
                    name: "time",
                    type: "uint64"
                }
            ],
            name: "StateChanged",
            type: "event"
        },
        args: {
            id: BigInt(lotId)
        },

    })

    console.log("Delivered:", Delivered)
    console.log("StageAnchored:", StageAnchored)
    console.log("StateChanged:", StateChanged)

    return (
        <div>
            HOla Mundo
        </div>
    )

}