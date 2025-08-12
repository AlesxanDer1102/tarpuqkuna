import { CertificateData } from "@/types"
import { publicClient } from "./client"
import { certificatesContract } from "./constants"

export async function getLotCertificates(lotId: bigint): Promise<CertificateData[]> {
  try {
    const certKeys = await publicClient.readContract({
      ...certificatesContract,
      functionName: 'getLotCertKeys',
      args: [lotId],
    }) as string[]

    if (!certKeys || certKeys.length === 0) {
      return []
    }

    const certificates = await Promise.all(
      certKeys.filter(key => key && key !== '0x0000000000000000000000000000000000000000000000000000000000000000').map(async (key) => {
        try {
          const cert = await publicClient.readContract({
            ...certificatesContract,
            functionName: 'getByKey',
            args: [key as `0x${string}`],
          }) as [string, string, string, bigint, bigint, boolean, string]

          return {
            certType: cert[0] || '',
            docHash: cert[1] || '',
            issuer: cert[2] || '',
            issuedAt: cert[3] || BigInt(0),
            expiresAt: cert[4] || BigInt(0),
            revoked: cert[5] || false,
            sig: cert[6] || '',
          }
        } catch (certError) {
          console.error('Error fetching individual certificate:', certError)
          return null
        }
      })
    )

    return certificates.filter(cert => cert !== null) as CertificateData[]
  } catch (error) {
    console.error('Error fetching certificates:', error)
    return []
  }
}