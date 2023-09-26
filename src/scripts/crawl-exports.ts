import { promises as fs } from 'fs'
import path from 'path'

const pathsToCrawl: string[] = []

// Find the index of the '-p' flag in process.argv
const pIndex = process.argv.indexOf('-p')

// Check if the '-p' flag is present and if there are values following it
if (pIndex !== -1 && pIndex + 1 < process.argv.length) {
  // Iterate through process.argv starting from the index after '-p'
  for (let i = pIndex + 1; i < process.argv.length; i++) {
    const arg = process.argv[i]

    // If the argument starts with a '-', break the loop (end of values)
    if (arg.startsWith('-')) {
      break
    }

    // Otherwise, add the argument to the values array
    pathsToCrawl.push(arg)
  }

  if (pathsToCrawl.length > 0) {
  } else {
    console.error('No absolute path provided as values for -p flag.')
  }
} else {
  console.error('No absolute path provided as values for -p flag.')
}

const crawlExports = async (
  dir: string,
  names: string[],
  absolutePath: string
) => {
  const absoluteDir: string = `${absolutePath}${
    (names.length ? '/' : '') + names.join('/')
  }`

  try {
    const indexPath = path.join(dir, 'index.ts')
    // Read the list of files and subdirectories in the current directory
    const items = await fs.readdir(dir)

    // Filter out both .tsx and .ts files
    const tsFiles = items.filter(
      (file: string) =>
        (file.endsWith('.tsx') || file.endsWith('.ts')) && file !== 'index.ts'
    )

    // Generate import statements for each subdirectory
    const importStatements = tsFiles.map(
      (file: string) =>
        `export * from '${absoluteDir}/${file.replace(/\.(tsx|ts)$/, '')}'`
    )

    // Write the import statements to the index.ts file
    if (tsFiles.length)
      await fs.writeFile(indexPath, importStatements.join('\n') + '\n', 'utf8')

    console.log(`${absoluteDir} crawled!`)
  } catch (error) {
    console.error(`Error updating ${absoluteDir}/index.ts:`, error)
  }
}

const crawlDir = async (dir: string, names: string[], absolutePath: string) => {
  // Crawl through the top-level "components" directory
  crawlExports(dir, names, absolutePath)

  // Crawl through subdirectories recursively
  const items = await fs.readdir(dir)
  for (const item of items) {
    const subpath = path.join(dir, item)
    const stat = await fs.stat(subpath)
    if (stat.isDirectory()) {
      await crawlDir(subpath, [...names, item], absolutePath)
    }
  }
}

const crawl = async (absolutePath: string) => {
  const dir = path.join(__dirname, `../${absolutePath}`)
  await crawlDir(dir, [], absolutePath) // Ensure await here
}

// Call the crawl function for each path
;(async () => {
  pathsToCrawl.forEach(async path => {
    await crawl(path)
  })
})()
