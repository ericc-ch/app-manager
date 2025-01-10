import consola from "consola"
import { Data, Effect } from "effect"
import { FetchError, ofetch } from "ofetch"

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

class HttpError extends Data.TaggedError("HttpError")<{
  cause: FetchError
}> {}

const fetchFn = () =>
  ofetch<WindsurfLatestInfo>(URL_LATEST, {
    method: "GET",
  })

const log = (info: WindsurfLatestInfo) => {
  consola.success(`Latest Windsurf version found: ${info.windsurfVersion}`)
}

export const fetchLatestVersion = () =>
  Effect.tryPromise({
    try: fetchFn,
    catch: (cause) => new HttpError({ cause: cause as FetchError }),
  }).pipe(Effect.tap(log))
