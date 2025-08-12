import { FarmData } from "@/types"
import { publicClient } from "./client"
import { farmNFTContract } from "./constants"
import { safeReadContract } from "./safeContract"

export interface FarmDataResult {
  data: FarmData | null
  error: string | null
  isSuccess: boolean
}

export async function getFarmData(farmNftId: bigint): Promise<FarmDataResult> {
  const result = await safeReadContract(publicClient, {
    address: farmNFTContract.address,
    abi: farmNFTContract.abi,
    functionName: 'farm',
    args: [farmNftId],
  })

  if (!result.isSuccess || !result.data) {
    return {
      data: null,
      error: result.error || 'Failed to fetch farm data',
      isSuccess: false
    }
  }

  try {
    const farmArray = result.data as [string, string, string, string, string, string, string]

    // Validate array structure
    if (!Array.isArray(farmArray) || farmArray.length < 7) {
      return {
        data: null,
        error: 'Invalid farm data structure returned from contract',
        isSuccess: false
      }
    }

    const farmData: FarmData = {
      name: farmArray[0] || 'Unknown Farm',
      region: farmArray[1] || 'Unknown Region',
      countryISO: farmArray[2] || 'XX',
      geohash: farmArray[3] || '',
      cropFocus: farmArray[4] || 'Unknown Crop',
      photoURI: farmArray[5] || '',
      metaURI: farmArray[6] || '',
    }

    return {
      data: farmData,
      error: null,
      isSuccess: true
    }
  } catch (error) {
    return {
      data: null,
      error: `Error parsing farm data: ${error instanceof Error ? error.message : 'Unknown error'}`,
      isSuccess: false
    }
  }
}

// Legacy function for backward compatibility
export async function getFarmDataLegacy(farmNftId: bigint): Promise<FarmData | null> {
  const result = await getFarmData(farmNftId)
  return result.data
}