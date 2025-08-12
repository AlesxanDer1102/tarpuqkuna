import { CertificateData } from "@/types"
import { publicClient } from "./client"
import { certificatesContract } from "./constants"
import { safeReadContract } from "./safeContract"

export interface CertificatesResult {
  data: CertificateData[]
  error: string | null
  isSuccess: boolean
  isEmpty: boolean
}

export async function getLotCertificates(lotId: bigint): Promise<CertificatesResult> {
  // First, safely get the certificate keys
  const keysResult = await safeReadContract(publicClient, {
    address: certificatesContract.address,
    abi: certificatesContract.abi,
    functionName: 'getLotCertKeys',
    args: [lotId],
  })

  if (!keysResult.isSuccess || !keysResult.data) {
    return {
      data: [],
      error: keysResult.error || 'Failed to fetch certificate keys',
      isSuccess: false,
      isEmpty: true
    }
  }

  const certKeys = keysResult.data as string[]
  
  // Validate keys array
  if (!Array.isArray(certKeys)) {
    return {
      data: [],
      error: 'Invalid certificate keys format returned from contract',
      isSuccess: false,
      isEmpty: true
    }
  }

  // Filter out null/empty keys
  const validKeys = certKeys.filter(key => 
    key && 
    key !== '0x0000000000000000000000000000000000000000000000000000000000000000' &&
    typeof key === 'string' &&
    key.length > 0
  )

  if (validKeys.length === 0) {
    return {
      data: [],
      error: null,
      isSuccess: true,
      isEmpty: true
    }
  }

  // Fetch individual certificates with better error handling
  const certificatePromises = validKeys.map(async (key, index) => {
    try {
      const certResult = await safeReadContract(publicClient, {
        abi: certificatesContract.abi,
        address: certificatesContract.address,
        functionName: 'getByKey',
        args: [key as `0x${string}`],
      })

      if (!certResult.isSuccess || !certResult.data) {
        console.warn(`Failed to fetch certificate ${index + 1}/${validKeys.length} with key ${key}:`, certResult.error)
        return null
      }

      const cert = certResult.data as any

      // Validate certificate structure
      if (!cert || typeof cert !== 'object') {
        console.warn(`Invalid certificate data structure for key ${key}`)
        return null
      }

      return {
        certType: cert.certType || '',
        docHash: cert.docHash || '',
        issuer: cert.issuer || '',
        issuedAt: cert.issuedAt || BigInt(0),
        expiresAt: cert.expiresAt || BigInt(0),
        revoked: cert.revoked || false,
        sig: cert.sig || '',
      } as CertificateData

    } catch (error: any) {
      console.error(`Error fetching individual certificate with key ${key}:`, error)
      return null
    }
  })

  try {
    const certificates = await Promise.all(certificatePromises)
    const validCertificates = certificates.filter(cert => cert !== null) as CertificateData[]

    const hasErrors = certificates.some(cert => cert === null)
    const partialError = hasErrors ? 'Some certificates could not be loaded' : null

    return {
      data: validCertificates,
      error: partialError,
      isSuccess: true,
      isEmpty: validCertificates.length === 0
    }
  } catch (error: any) {
    return {
      data: [],
      error: `Error processing certificates: ${error?.message || 'Unknown error'}`,
      isSuccess: false,
      isEmpty: true
    }
  }
}

// Legacy function for backward compatibility
export async function getLotCertificatesLegacy(lotId: bigint): Promise<CertificateData[]> {
  const result = await getLotCertificates(lotId)
  return result.data
}