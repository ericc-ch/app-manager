import { defineCommand } from "citty"

import { deleteWindsurf } from "./delete"
import { installWindsurf } from "./install"

const install = defineCommand({
  meta: {
    name: "install",
    description: "Install the latest version of Windsurf",
  },
  args: {
    // https://github.com/unjs/citty/issues/176
    download: {
      type: "boolean",
      description: "Do not download windsurf, check only the latest version",
      default: true,
    },
  },
  run: ({ args }) => installWindsurf(args),
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
    name: "windsurf",
    description: "Install / uninstall Windsurf",
  },
  subCommands: {
    install,
    delete: _delete,
  },
})
