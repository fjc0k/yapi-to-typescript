/* eslint-disable react-hooks/exhaustive-deps,import/no-unresolved,react-hooks/rules-of-hooks */
import {AsyncReturnType} from 'vtils'
import {useEffect, useState} from 'react'

type RequestFunction = (...args: any[]) => Promise<any>

interface CreateApiHookPayload<T extends RequestFunction> {
  useState: typeof useState,
  useEffect: typeof useEffect,
  requestFunction: T,
  autoTrigger: boolean,
}

interface ApiHookResult<T extends RequestFunction> {
  data: AsyncReturnType<T> | null,
  loading: boolean,
  error: any,
  trigger: () => void,
}

interface ApiHook<T extends RequestFunction> {
  (requestData: Parameters<T>[0] | (() => Parameters<T>[0])): ApiHookResult<T>,
}

interface ApiHookOptional<T extends RequestFunction> {
  (requestData?: Parameters<T>[0] | (() => Parameters<T>[0])): ApiHookResult<T>,
}

export function createApiHook<T extends RequestFunction, O extends boolean>(
  {useState, useEffect, requestFunction, autoTrigger}: CreateApiHookPayload<T>,
): O extends true ? ApiHookOptional<T> : ApiHook<T> {
  return function useApi(requestData: Parameters<T>[0] | (() => Parameters<T>[0])) {
    const [data, setData] = useState<AsyncReturnType<T> | null>(null)
    const [loading, setLoading] = useState<boolean>(!!autoTrigger)
    const [error, setError] = useState<any>(null)

    const request = (requestData: Parameters<T>[0]) => {
      setLoading(true)
      ;(requestData == null ? requestFunction() : requestFunction(requestData))
        .then(
          data => {
            if (error != null) {
              setError(null)
            }
            setData(data)
          },
          error => setError(error),
        )
        .then(() => {
          setLoading(false)
        })
    }

    if (autoTrigger) {
      const _requestData = typeof requestData === 'function'
        ? requestData()
        : requestData
      const hash = JSON.stringify(_requestData)
      useEffect(
        () => request(_requestData),
        [hash],
      )
    }

    return {
      data: data,
      loading: loading,
      error: error,
      trigger: () => {
        const _requestData = typeof requestData === 'function'
          ? requestData()
          : requestData
        request(_requestData)
      },
    }
  } as any
}
