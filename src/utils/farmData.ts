import { FarmData } from "@/types"
import { publicClient } from "./client"
import { farmNFTContract } from "./constants"


export async function getFarmData(farmNftId: bigint): Promise<FarmData | null> {
  try {
    const result = await publicClient.readContract({
      address: farmNFTContract.address,
      abi: farmNFTContract.abi,
      functionName: 'farm',
      args: [farmNftId],
    }) as [string, string, string, string, string, string, string]

    return {
      name: result[0],
      region: result[1],
      countryISO: result[2],
      geohash: result[3],
      cropFocus: result[4],
      photoURI: result[5],
      metaURI: result[6],
    }
  } catch (error) {
    console.error('Error fetching farm data:', error)
    return null
  }
}