import consola from "consola"
import { Effect } from "effect"
import { ofetch } from "ofetch"

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

export const fetchLatestVersion = Effect.gen(function* () {
  const responseLatest = yield* Effect.tryPromise(() =>
    ofetch<WindsurfLatestInfo>(URL_LATEST, {
      method: "GET",
    }),
  )

  consola.success(
    `Latest Windsurf version found: ${responseLatest.windsurfVersion}`,
  )

  return responseLatest
})
