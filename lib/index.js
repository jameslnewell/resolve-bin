import path from 'path'
import debug from 'debug'
import {findUp} from 'find-up'
import {loadJsonFile} from 'load-json-file'

const log = debug('@jameslnewell/resolve-bin')

/**
 * @typedef ResolveBinOptions
 * @prop {string?} from
 * @prop {string?} executable
 */

/**
 * Resolve the path of a binary from a npm package
 * @param {string} pkg The package name
 * @param {ResolveBinOptions} options
 * @returns {Promise<string>}
 */
export async function resolveBin(pkg, {from = process.cwd(), executable} = {}) {
    log('searching for %s from %s', executable ? `${pkg}#${executable}` : pkg, from)
    const manifestFile = await findUp(`node_modules/${pkg}/package.json`, {cwd: from})
    if (!manifestFile) throw new Error(`Package not found: ${pkg}`)
    const manifestDir = path.dirname(manifestFile)
    log('loading package.json from %s', manifestDir)
    const manifestJSON = await loadJsonFile(manifestFile)
    const bin = typeof manifestJSON?.bin === 'string' ? {[pkg]: manifestJSON.bin} : manifestJSON.bin ?? {}
    log('selecting executable %s', bin)
    const binPath = executable ? bin[executable] : bin[pkg]
    if (!binPath) throw new Error(`Bin entry not found in ${manifestFile} for ${executable ? executable : pkg}`)
    return path.join(manifestDir, binPath)
}
