import os from "node:os"
import path from "node:path"

const DOWNLOAD_DESTINATION = path.join(os.tmpdir(), "windsurf.tar.gz")
const EXTRACT_DIRECTORY = path.join(os.homedir(), ".local", "share")

const WINDSURF_DIR = path.join(EXTRACT_DIRECTORY, "Windsurf")
const WINDSURF_BIN = path.join(WINDSURF_DIR, "bin", "windsurf")
const WINDSURF_LINK = path.join(os.homedir(), ".local", "bin", "windsurf")

export const WINDSURF_PATH = {
  DOWNLOAD_DESTINATION,
  EXTRACT_DIRECTORY,

  WINDSURF_DIR,
  WINDSURF_BIN,
  WINDSURF_LINK,
}
