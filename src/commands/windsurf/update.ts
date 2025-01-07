interface WindsurfLatestInfo {
  url: string
  name: string
  version: string
  productVersion: string
  hash: string
  timestamp: number
  sha256hash: string
  supportsFastUpdate: boolean
  windsurfVersion: string
}

const URL_LATEST =
  "https://windsurf-stable.codeium.com/api/update/linux-x64/stable/latest"

const response = await fetch(URL_LATEST, {
  method: "GET",
})

const json = (await response.json()) as WindsurfLatestInfo

const fileResponse = await fetch(json.url, {
  method: "GET",
})

const blob = await fileResponse.blob()

await Bun.write("windsurf.tar.gz", blob)
