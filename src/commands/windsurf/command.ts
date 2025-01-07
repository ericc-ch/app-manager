import { defineCommand } from "citty"

import { updateWindsurf } from "./update"

const update = defineCommand({
  meta: {
    name: "update",
    description: "Update Windsurf",
  },
  run: () => {
    return updateWindsurf()
  },
})

export const windsurf = defineCommand({
  meta: {
    name: "Windsurf",
    description: "Update / uninstall Windsurf",
  },
  subCommands: {
    update,
  },
})
