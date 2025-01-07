import fs from "node:fs"

interface CreateSymlinkOptions {
  source: string
  target: string
}

export function createSymlink(options: CreateSymlinkOptions) {
  fs.symlinkSync(options.source, options.target)
}
