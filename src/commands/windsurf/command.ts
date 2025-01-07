import { defineCommand } from "citty"

export const windsurf = defineCommand({
  meta: {
    name: "Windsurf",
    description: "Update / uninstall Windsurf",
  },
  args: {
    action: {
      type: "positional",
      required: true,
      description: "The action to perform",
    },
  },
})
