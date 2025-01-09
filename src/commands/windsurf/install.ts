import consola from "consola"
import fs from "node:fs"
import { ofetch } from "ofetch"

import { ensureDirectory } from "~/lib/fs"
import { createSymlink } from "~/lib/symlink"
import { extractTar } from "~/lib/tar"

import { WINDSURF_PATH } from "./variables"

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

interface InstallWindsurfOptions {
  download?: boolean
}

export async function installWindsurf({ download }: InstallWindsurfOptions) {
  ensureDirectory(WINDSURF_PATH.EXTRACT_DIRECTORY)

  const responseLatest = await ofetch<WindsurfLatestInfo>(URL_LATEST, {
    method: "GET",
  })

  consola.log(responseLatest)

  consola.success(
    `Latest Windsurf version found: ${responseLatest.windsurfVersion}`,
  )

  consola.info({ download })

  if (!download) {
    consola.info("no-download flag is set, skipping download")
    return
  }

  consola.start("Downloading Windsurf")
  const responseDownload = await fetch(responseLatest.url, {
    method: "GET",
  })

  const blob = await responseDownload.blob()

  await Bun.write(WINDSURF_PATH.DOWNLOAD_DESTINATION, blob)
  consola.success(
    `Windsurf downloaded to ${WINDSURF_PATH.DOWNLOAD_DESTINATION}`,
  )

  await extractTar({
    source: WINDSURF_PATH.DOWNLOAD_DESTINATION,
    target: WINDSURF_PATH.EXTRACT_DIRECTORY,
  })
  consola.success(`Windsurf extracted to ${WINDSURF_PATH.EXTRACT_DIRECTORY}`)

  createSymlink({
    source: WINDSURF_PATH.WINDSURF_BIN,
    target: WINDSURF_PATH.WINDSURF_LINK,
  })
  consola.success(
    `Symlink created for Windsurf at ${WINDSURF_PATH.WINDSURF_LINK}`,
  )

  fs.rmSync(WINDSURF_PATH.DOWNLOAD_DESTINATION)
  consola.info(`Cleaned up ${WINDSURF_PATH.DOWNLOAD_DESTINATION}`)
}
