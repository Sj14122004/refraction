
export function triggerBlobDownload(blob: Blob, filename: string) {
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => window.URL.revokeObjectURL(url), 1000)
}

export function getDownloadFilename(
  disposition: string | null,
  fallbackFilename: string
): string {
  if (!disposition || !disposition.includes('filename=')) {
    return fallbackFilename
  }

  const match = disposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/)

  return match?.[1]
    ? match[1].replace(/['"]/g, '')
    : fallbackFilename
}

export function createFlatFileBlob(content: string): Blob {
  return new Blob([content], { type: 'text/plain;charset=utf-8' })
}
