/* eslint-disable @typescript-eslint/no-explicit-any */
import { PublicClient } from 'viem'
import type { Abi, Address, ContractFunctionName, ContractFunctionArgs, ContractEventName } from 'viem'

export interface SafeContractResult<T> {
  data: T | null
  error: string | null
  isLoading: boolean
  isSuccess: boolean
}

export interface SafeEventResult<T> {
  data: T[]
  error: string | null
  isLoading: boolean
  isSuccess: boolean
  isEmpty: boolean
}

/**
 * Safely execute a readContract call with comprehensive error handling
 */
export async function safeReadContract<
  TAbi extends Abi | readonly unknown[],
  TFunctionName extends ContractFunctionName<TAbi, 'pure' | 'view'>,
  TArgs extends ContractFunctionArgs<TAbi, 'pure' | 'view', TFunctionName>
>(
  client: PublicClient,
  config: {
    address: Address
    abi: TAbi
    functionName: TFunctionName
    args?: TArgs
  }
): Promise<SafeContractResult<any>> {
  try {
    const result = await client.readContract(config)
    
    // Check if result is null, undefined, or empty array
    if (result === null || result === undefined) {
      return {
        data: null,
        error: 'Contract returned null or undefined',
        isLoading: false,
        isSuccess: false
      }
    }
    
    // Handle empty arrays
    if (Array.isArray(result) && result.length === 0) {
      return {
        data: null,
        error: 'Contract returned empty array',
        isLoading: false,
        isSuccess: false
      }
    }
    
    return {
      data: result,
      error: null,
      isLoading: false,
      isSuccess: true
    }
    
  } catch (error: any) {
    console.error(`Error reading contract ${config.address}:${String(config.functionName)}:`, error)
    
    let errorMessage = 'Unknown contract error'
    
    if (error?.message) {
      if (error.message.includes('reverted')) {
        errorMessage = 'Contract call reverted - data may not exist'
      } else if (error.message.includes('network')) {
        errorMessage = 'Network error - please check your connection'
      } else if (error.message.includes('timeout')) {
        errorMessage = 'Request timeout - blockchain may be congested'
      } else {
        errorMessage = error.message
      }
    }
    
    return {
      data: null,
      error: errorMessage,
      isLoading: false,
      isSuccess: false
    }
  }
}

/**
 * Safely execute a getContractEvents call with comprehensive error handling
 */
export async function safeGetContractEvents<
  TAbi extends Abi | readonly unknown[],
  TEventName extends ContractEventName<TAbi>
>(
  client: PublicClient,
  config: {
    address: Address
    abi: TAbi
    eventName: TEventName
    fromBlock?: bigint
    toBlock?: bigint
    args?: any
    strict?: boolean
  }
): Promise<SafeEventResult<any>> {
  try {
    const events = await client.getContractEvents(config)
    
    return {
      data: events || [],
      error: null,
      isLoading: false,
      isSuccess: true,
      isEmpty: !events || events.length === 0
    }
    
  } catch (error: any) {
    console.error(`Error getting events ${config.address}:${config.eventName}:`, error)
    
    let errorMessage = 'Unknown event query error'
    
    if (error?.message) {
      if (error.message.includes('Log response size exceeded')) {
        errorMessage = 'Too many events found - try narrowing the block range'
      } else if (error.message.includes('network')) {
        errorMessage = 'Network error - please check your connection'
      } else if (error.message.includes('timeout')) {
        errorMessage = 'Request timeout - try reducing the block range'
      } else if (error.message.includes('rate limit')) {
        errorMessage = 'Rate limit exceeded - please try again later'
      } else {
        errorMessage = error.message
      }
    }
    
    return {
      data: [],
      error: errorMessage,
      isLoading: false,
      isSuccess: false,
      isEmpty: true
    }
  }
}

/**
 * Safely access array elements with proper error handling
 */
export function safeArrayAccess<T>(
  array: T[] | null | undefined,
  index: number,
  errorContext?: string
): { item: T | null; error: string | null } {
  if (!array) {
    return {
      item: null,
      error: `Array is ${array === null ? 'null' : 'undefined'}${errorContext ? ` in ${errorContext}` : ''}`
    }
  }
  
  if (!Array.isArray(array)) {
    return {
      item: null,
      error: `Expected array but got ${typeof array}${errorContext ? ` in ${errorContext}` : ''}`
    }
  }
  
  if (array.length === 0) {
    return {
      item: null,
      error: `Array is empty${errorContext ? ` in ${errorContext}` : ''}`
    }
  }
  
  if (index < 0 || index >= array.length) {
    return {
      item: null,
      error: `Index ${index} out of bounds (array length: ${array.length})${errorContext ? ` in ${errorContext}` : ''}`
    }
  }
  
  const item = array[index]
  if (item === null || item === undefined) {
    return {
      item: null,
      error: `Item at index ${index} is ${item === null ? 'null' : 'undefined'}${errorContext ? ` in ${errorContext}` : ''}`
    }
  }
  
  return {
    item,
    error: null
  }
}

/**
 * Safely find an item in an array with proper error handling
 */
export function safeFindInArray<T>(
  array: T[] | null | undefined,
  predicate: (item: T) => boolean,
  errorContext?: string
): { item: T | null; error: string | null; found: boolean } {
  if (!array) {
    return {
      item: null,
      error: `Array is ${array === null ? 'null' : 'undefined'}${errorContext ? ` in ${errorContext}` : ''}`,
      found: false
    }
  }
  
  if (!Array.isArray(array)) {
    return {
      item: null,
      error: `Expected array but got ${typeof array}${errorContext ? ` in ${errorContext}` : ''}`,
      found: false
    }
  }
  
  if (array.length === 0) {
    return {
      item: null,
      error: `Array is empty${errorContext ? ` in ${errorContext}` : ''}`,
      found: false
    }
  }
  
  try {
    const item = array.find(predicate)
    if (!item) {
      return {
        item: null,
        error: `No matching item found${errorContext ? ` in ${errorContext}` : ''}`,
        found: false
      }
    }
    
    return {
      item,
      error: null,
      found: true
    }
  } catch (error: any) {
    return {
      item: null,
      error: `Error in find operation: ${error?.message || 'Unknown error'}${errorContext ? ` in ${errorContext}` : ''}`,
      found: false
    }
  }
}

/**
 * Safely decode base64 JSON with error handling
 */
export function safeDecodeBase64Json<T>(
  base64String: string | null | undefined,
  errorContext?: string
): { data: T | null; error: string | null } {
  if (!base64String) {
    return {
      data: null,
      error: `Base64 string is ${base64String === null ? 'null' : 'undefined'}${errorContext ? ` in ${errorContext}` : ''}`
    }
  }
  
  try {
    // Check if it's a data URL
    if (base64String.startsWith('data:application/json;base64,')) {
      const base64Data = base64String.replace('data:application/json;base64,', '')
      const decodedJson = Buffer.from(base64Data, 'base64').toString('utf-8')
      const parsed = JSON.parse(decodedJson) as T
      return { data: parsed, error: null }
    }
    
    // Try to decode as raw base64
    const decodedJson = Buffer.from(base64String, 'base64').toString('utf-8')
    const parsed = JSON.parse(decodedJson) as T
    return { data: parsed, error: null }
    
  } catch (error: any) {
    return {
      data: null,
      error: `Error decoding base64 JSON: ${error?.message || 'Invalid format'}${errorContext ? ` in ${errorContext}` : ''}`
    }
  }
}