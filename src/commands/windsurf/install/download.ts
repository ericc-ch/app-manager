import consola from "consola"
import { Effect } from "effect"

import { WINDSURF_PATH } from "../variables"

interface InstallWindsurfOptions {
  download?: boolean
}

export const installWindsurf = (url: string) =>
  Effect.gen(function* () {
    consola.start("Downloading Windsurf")
    const responseDownload = await fetch(responseLatest.url, {
      method: "GET",
    })

    const blob = await responseDownload.blob()

    await Bun.write(WINDSURF_PATH.DOWNLOAD_DESTINATION, blob)
    consola.success(
      `Windsurf downloaded to ${WINDSURF_PATH.DOWNLOAD_DESTINATION}`,
    )
  })
