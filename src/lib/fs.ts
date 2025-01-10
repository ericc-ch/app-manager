import { Data, Effect } from "effect"
import fs from "node:fs/promises"

class FileError extends Data.TaggedError("FileError")<{
  message: string
  cause?: Error
}> {}

export const ensureDirectory = (directory: string) =>
  Effect.tryPromise({
    try: () => fs.mkdir(directory, { recursive: true }),
    catch: (error) =>
      new FileError({
        message: "Failed to create directory",
        cause: error as Error,
      }),
  })
