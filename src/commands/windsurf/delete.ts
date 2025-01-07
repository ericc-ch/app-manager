import consola from "consola"
import fs from "node:fs"

import { WINDSURF_PATH } from "./variables"

export function deleteWindsurf() {
  if (!fs.existsSync(WINDSURF_PATH.WINDSURF_LINK)) {
    consola.warn("Windsurf symlink is not found")
    return
  }

  if (!fs.existsSync(WINDSURF_PATH.WINDSURF_BIN)) {
    consola.warn("Windsurf binary is not found")
    return
  }

  consola.start("Deleting Windsurf")
  fs.rmSync(WINDSURF_PATH.WINDSURF_LINK)
  fs.rmSync(WINDSURF_PATH.WINDSURF_BIN)
  consola.success("Windsurf deleted")
}
