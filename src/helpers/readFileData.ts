
import JSZip from "jszip";
import SevenZip from "7z-wasm";

let sevenZipPromise: Promise<any> | null = null;
let requestId = 0;

async function getSevenZip() {
  if (!sevenZipPromise) {
    sevenZipPromise = SevenZip();
  }

  return sevenZipPromise;
}

function validateInternalPath(path: string): string {
  const normalized = path.replace(/\\/g, "/");

  if (
    !normalized ||
    normalized.startsWith("/") ||
    normalized.split("/").some((part) => part === "..")
  ) {
    throw new Error("Invalid archive file path");
  }

  return normalized;
}

/**
 * Read one file from a ZIP archive.
 * Returns the selected file as bytes.
 */

export async function readZipFile(
  archive: File,
  internalPath: string,
): Promise<string> {
  const zip = await JSZip.loadAsync(archive);

  const targetPath = internalPath.toLowerCase().replace(/\\/g, "/");

  const matchedPath = Object.keys(zip.files).find(
    (path) => path.toLowerCase() === targetPath,
  );

  if (!matchedPath || zip.files[matchedPath].dir) {
    throw new Error(`File not found in ZIP: ${internalPath}`);
  }

  const source = await zip.files[matchedPath].async("text");

  const match = source.match(
    /^\s*WEB_CURRENT_VERSION\s*=\s*(['"])(.*?)\1\s*$/m,
  );

  if (!match) {
    throw new Error("WEB_VERSION variable not found in Python file");
  }

  return match[2];
}

/**
 * Read one file from a password-protected 7z archive.
 * Processing happens in WebAssembly memory.
 */
export async function read7zFile(
  archive: File,
  internalPath: string,
  password: string,
): Promise<Uint8Array> {
  if (!archive.name.toLowerCase().endsWith(".7z")) {
    throw new Error("Expected a .7z archive");
  }

  if (!password) {
    throw new Error("7z archive password is required");
  }

  const path = validateInternalPath(internalPath);
  const sevenZip = await getSevenZip();

  const id = ++requestId;
  const root = `/fota_${id}`;
  const archivePath = `${root}/archive.7z`;
  const outputDir = `${root}/out`;
  const outputPath = `${outputDir}/${path}`;

  const FS = sevenZip.FS;

  FS.mkdir(root);
  FS.mkdir(outputDir);

  try {
    const bytes = new Uint8Array(await archive.arrayBuffer());

    FS.writeFile(archivePath, bytes);

    sevenZip.callMain([
      "x",
      archivePath,
      path,
      `-p${password}`,
      `-o${outputDir}`,
      "-y",
    ]);

    // Copy the extracted file into a JS-owned byte array.
    return new Uint8Array(FS.readFile(outputPath));
  } finally {
    // Remove temporary files from the WebAssembly filesystem.
    const removeRecursively = (pathToRemove: string) => {
      try {
        const stat = FS.stat(pathToRemove);

        if (FS.isDir(stat.mode)) {
          for (const child of FS.readdir(pathToRemove)) {
            if (child !== "." && child !== "..") {
              removeRecursively(`${pathToRemove}/${child}`);
            }
          }

          FS.rmdir(pathToRemove);
        } else {
          FS.unlink(pathToRemove);
        }
      } catch {
        // Ignore paths that do not exist.
      }
    };

    removeRecursively(root);
  }
}

/**
 * Optional helper when the selected file is text or JSON.
 */
export function readText(bytes: Uint8Array): string {
  return new TextDecoder().decode(bytes);
}
