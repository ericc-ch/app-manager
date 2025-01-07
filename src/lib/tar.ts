import spawn from "nano-spawn"

interface ExtractTarOptions {
  /**
   * Source tar file
   */
  source: string

  /**
   * Target directory
   */
  target: string
}

/**
 * Extracts a tarball archive to a specified directory.
 *
 * @param options - An object containing the source tar file and the target directory.
 * @param options.source - The path to the tar file to be extracted.
 * @param options.target - The directory where the tar contents will be extracted.
 * @returns A promise that resolves when the extraction process is complete.
 */
export function extractTar(options: ExtractTarOptions) {
  return spawn("tar", ["-xz", "-f", options.source, "-C", options.target])
}
