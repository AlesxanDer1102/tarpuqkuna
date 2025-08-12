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
            abi: certificatesContract.abi,
            address: certificatesContract.address,
            functionName: 'getByKey',
            args: [key as `0x${string}`],
          })

          return {
            certType: cert.certType || '',
            docHash: cert.docHash || '',
            issuer: cert.issuer || '',
            issuedAt: cert.issuedAt || BigInt(0),
            expiresAt: cert.expiresAt || BigInt(0),
            revoked: cert.revoked || false,
            sig: cert.sig || '',
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