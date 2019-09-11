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
  data: AsyncReturnType<T>,
  loading: boolean,
  error: any,
  trigger: (callback?: () => any) => void,
}

interface ApiHook<T extends RequestFunction> {
  (requestData: Parameters<T>[0] | (() => Parameters<T>[0] | null | undefined)): ApiHookResult<T>,
}

interface ApiHookOptional<T extends RequestFunction> {
  (requestData?: Parameters<T>[0] | (() => Parameters<T>[0] | null | undefined)): ApiHookResult<T>,
}

export function createApiHook<T extends RequestFunction, O extends boolean>(
  {useState, useEffect, requestFunction, autoTrigger}: CreateApiHookPayload<T>,
): O extends true ? ApiHookOptional<T> : ApiHook<T> {
  const useApi: ApiHook<T> = function (requestData: Parameters<T>[0] | (() => Parameters<T>[0])) {
    const [data, setData] = useState<AsyncReturnType<T>>(null as any)
    const [loading, setLoading] = useState<boolean>(!!autoTrigger)
    const [error, setError] = useState<any>(null)

    const request = (requestData: Parameters<T>[0], callback?: () => any) => {
      setLoading(true)
      ;(requestData == null ? requestFunction() : requestFunction(requestData))
        .then(
          data => {
            if (error != null) {
              setError(null)
            }
            setData(data)
            if (typeof callback === 'function') {
              callback()
            }
          },
          error => setError(error),
        )
        .then(() => {
          setLoading(false)
        })
    }

    if (autoTrigger) {
      const requestDataIsFunction = typeof requestData === 'function'
      const _requestData = requestDataIsFunction
        ? (requestData as any)()
        : requestData
      const hash = JSON.stringify(_requestData)
      useEffect(
        () => {
          if (requestDataIsFunction && _requestData == null) return
          request(_requestData)
        },
        [hash],
      )
    }

    return {
      data: data,
      loading: loading,
      error: error,
      trigger: callback => {
        const requestDataIsFunction = typeof requestData === 'function'
        const _requestData = requestDataIsFunction
          ? (requestData as any)()
          : requestData
        if (requestDataIsFunction && _requestData == null) return
        request(_requestData, callback)
      },
    }
  }
  return useApi as any
}
