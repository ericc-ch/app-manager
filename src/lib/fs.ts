import { Data, Effect } from "effect"
import fs from "node:fs/promises"

class FileError extends Data.TaggedError("FileError") {}

export const ensureDirectory = (directory: string) =>
  Effect.tryPromise({
    try: () => fs.mkdir(directory, { recursive: true }),
    catch: () => new FileError({  }),
  })
