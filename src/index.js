import path from 'path'
import debug from 'debug'
import {findUp} from 'find-up'
import {loadJsonFile} from 'load-json-file'

const log = debug('@jameslnewell/resolve-bin')

/**
 * @typedef ResolveBinOptions
 * @prop {string} package
 * @prop {string} [command]
 * @prop {string} [from]
 */

/**
 * Resolve the path of a binary from a npm package
 * @param {ResolveBinOptions} options
 * @returns {Promise<string>}
 */
export async function resolveBin({package: pkg, command, from = process.cwd()}) {
    log('searching for %s from %s', command ? `${pkg}#${command}` : pkg, from)
    const manifestFile = await findUp(`node_modules/${pkg}/package.json`, {cwd: from})
    if (!manifestFile) throw new Error(`Package not found: ${pkg}`)
    const manifestDir = path.dirname(manifestFile)
    log('loading package.json from %s', manifestDir)
    const manifestJSON = await loadJsonFile(manifestFile)
    const bin = typeof manifestJSON?.bin === 'string' ? {[pkg]: manifestJSON.bin} : manifestJSON.bin ?? {}
    log('selecting executable %s', bin)
    const binPath = command ? bin[command] : bin[pkg]
    if (!binPath) throw new Error(`Bin entry not found in ${manifestFile} for ${command ? command : pkg}`)
    return path.join(manifestDir, binPath)
}
