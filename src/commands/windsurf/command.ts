import { defineCommand } from "citty"

import { deleteWindsurf } from "./delete"
import { installWindsurf } from "./install"

const install = defineCommand({
  meta: {
    name: "install",
    description: "Download and install the latest version of Windsurf",
  },
  run: installWindsurf,
})

// Cannot name a variable "delete", reserved keyword
const _delete = defineCommand({
  meta: {
    name: "delete",
    description: "Delete Windsurf installation",
  },
  run: deleteWindsurf,
})

export const windsurf = defineCommand({
  meta: {
    name: "Windsurf",
    description: "Install / uninstall Windsurf",
  },
  subCommands: {
    install,
    delete: _delete,
  },
})
