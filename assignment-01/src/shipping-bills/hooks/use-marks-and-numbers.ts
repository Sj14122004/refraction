import { useEffect, useRef, useState } from 'react'
import { getMarksAndNumbersOptions, MarksAndNumbersOption } from '../marks-and-numbers-source'

interface UseMarksAndNumbersOptions {
  exporterId: string
  setValue: (name: 'marksAndNumbers', value: string, options?: { shouldValidate?: boolean }) => void
}

export function useMarksAndNumbers({ exporterId, setValue }: UseMarksAndNumbersOptions) {
  const [options, setOptions] = useState<MarksAndNumbersOption[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const previousExporterId = useRef(exporterId)

  useEffect(() => {
    if (previousExporterId.current !== exporterId) {
      previousExporterId.current = exporterId
      setValue('marksAndNumbers', '', { shouldValidate: true })
    }

    let cancelled = false
    setOptions([])
    setIsLoading(Boolean(exporterId))

    if (exporterId) {
      void getMarksAndNumbersOptions(exporterId)
        .then((result) => {
          if (cancelled) return
          setOptions(result)
        })
        .catch(() => {
          if (cancelled) return
          setOptions([])
        })
        .finally(() => {
          if (!cancelled) setIsLoading(false)
        })
    }

    return () => {
      cancelled = true
    }
  }, [exporterId, setValue])

  return { options, isLoading }
}
