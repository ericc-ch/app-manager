import { defineCommand, runMain } from "citty"

import { windsurf } from "./commands/windsurf/command"

const main = defineCommand({
  meta: {
    name: "app-manager",
    description: "Manage installed apps",
  },
  subCommands: {
    windsurf,
  },
})

void runMain(main)
