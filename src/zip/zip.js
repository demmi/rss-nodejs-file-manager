import { createReadStream, createWriteStream } from 'node:fs'
import { createBrotliCompress, createBrotliDecompress } from 'node:zlib'
import { access } from 'node:fs/promises'
import path from 'node:path'

const exist = async (fileName) => {
    try {
        await access(fileName)
        return true
    } catch (err) {
        return false
    }
}
export const compress = async (source, destination) => {
    if (!source || !destination) {
        return 'Invalid input\n' + process.cwd() + '\n'
    }
    const sourceFileName = path.resolve(process.cwd(), source)
    const destFileName = path.resolve(process.cwd(), destination)
    if ((await exist(destFileName)) || !(await exist(sourceFileName))) {
        return 'Operation failed\n' + process.cwd() + '\n'
    } else {
        const sourceStream = createReadStream(sourceFileName)
        const zipStream = createWriteStream(destFileName)
        sourceStream.pipe(createBrotliCompress()).pipe(zipStream)
    }
    return process.cwd() + '\n'
}

export const decompress = async (source, destination) => {
    if (!source || !destination) {
        return 'Invalid input\n' + process.cwd() + '\n'
    }
    const sourceFileName = path.resolve(process.cwd(), source)
    const destFileName = path.resolve(process.cwd(), destination)
    if ((await exist(destFileName)) || !(await exist(sourceFileName))) {
        return 'Operation failed\n' + process.cwd() + '\n'
    } else {
        const compressedStream = createReadStream(sourceFileName)
        const decompressedStream = createWriteStream(destFileName)
        compressedStream.pipe(createBrotliDecompress()).pipe(decompressedStream)
    }
    return process.cwd() + '\n'
}
