import { defineCommand } from "citty"

import { installWindsurf } from "./install/install"
import { uninstallWindsurf } from "./uninstall"

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

const uninstall = defineCommand({
  meta: {
    name: "uninstall",
    description: "Delete Windsurf installation",
  },
  run: uninstallWindsurf,
})

export const windsurf = defineCommand({
  meta: {
    name: "windsurf",
    description: "Install / uninstall Windsurf",
  },
  subCommands: {
    install,
    uninstall,
  },
})
