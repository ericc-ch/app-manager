import consola from "consola"
import fs from "node:fs"
import os from "node:os"
import path from "node:path"
import { ofetch } from "ofetch"

import { createSymlink } from "~/lib/symlink"
import { extractTar } from "~/lib/tar"

const PATH_DOWNLOAD = path.join(os.tmpdir(), "windsurf.tar.gz")
const PATH_EXTRACTED = path.join(os.homedir(), ".local", "share")

const PATH_WINDSURF_BIN = path.join(
  PATH_EXTRACTED,
  "Windsurf",
  "bin",
  "windsurf",
)
const PATH_WINDSURF_LINK = path.join(os.homedir(), ".local", "bin", "windsurf")

if (!fs.existsSync(PATH_EXTRACTED)) {
  fs.mkdirSync(PATH_EXTRACTED)
}

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

export async function updateWindsurf() {
  consola.start("Getting latest Windsurf version")
  const responseLatest = await ofetch<WindsurfLatestInfo>(URL_LATEST, {
    method: "GET",
  })

  consola.success(
    `Latest Windsurf version found: ${responseLatest.windsurfVersion}`,
  )

  consola.start("Downloading Windsurf")
  const responseDownload = await fetch(responseLatest.url, {
    method: "GET",
  })

  const blob = await responseDownload.blob()

  await Bun.write(PATH_DOWNLOAD, blob)
  consola.success(`Windsurf downloaded to ${PATH_DOWNLOAD}`)

  consola.start(`Extracting Windsurf to ${PATH_EXTRACTED}`)
  await extractTar({
    source: PATH_DOWNLOAD,
    target: PATH_EXTRACTED,
  })
  consola.success(`Windsurf extracted to ${PATH_EXTRACTED}`)

  createSymlink({
    source: PATH_WINDSURF_BIN,
    target: PATH_WINDSURF_LINK,
  })
  consola.success(`Symlink created for Windsurf at ${PATH_WINDSURF_LINK}`)
}
