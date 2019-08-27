/* eslint-disable react-hooks/exhaustive-deps,import/no-unresolved */
import {AsyncReturnType} from 'vtils'
import {useEffect, useState} from 'react'

type RequestFunction = (...args: any[]) => Promise<any>

interface CreateApiHookPayload<T extends RequestFunction> {
  useState: typeof useState,
  useEffect: typeof useEffect,
  requestFunction: T,
  autoTrigger: boolean,
}

interface ApiHook<T extends RequestFunction> {
  (...args: Parameters<T>): ({
    data: AsyncReturnType<T> | null,
    loading: boolean,
    error: any,
    trigger: () => void,
  }),
}

export function createApiHook<T extends RequestFunction>(payload: CreateApiHookPayload<T>): ApiHook<T> {
  return function useApi(...args: Parameters<T>) {
    const {useState, useEffect, requestFunction, autoTrigger} = payload
    const [data, setData] = useState<AsyncReturnType<T> | null>(null)
    const [loading, setLoading] = useState<boolean>(!!autoTrigger)
    const [error, setError] = useState<any>(null)
    const hash = JSON.stringify(args)

    const request = () => {
      setLoading(true)
      requestFunction(...args)
        .then(
          data => setData(data),
          error => setError(error),
        )
        .then(() => {
          setLoading(false)
        })
    }

    useEffect(
      () => {
        if (autoTrigger) {
          request()
        }
      },
      [hash],
    )

    return {
      data: data,
      loading: loading,
      error: error,
      trigger: request,
    }
  }
}
