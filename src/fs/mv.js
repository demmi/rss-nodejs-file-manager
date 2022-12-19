import path from 'node:path'
import { access, rm } from 'node:fs/promises'
import { createReadStream, createWriteStream } from 'node:fs'

export const moveFile = async (source, destination) => {
    if (!source || !destination) {
        return 'Invalid input\n' + process.cwd() + '\n'
    }
    const sourceFileName = path.resolve(process.cwd(), source)
    const destFileName = path.resolve(process.cwd(), destination)
    const exist = async (fileName) => {
        try {
            await access(fileName)
            return true
        } catch (err) {
            return false
        }
    }
    if ((await exist(destFileName)) || !(await exist(sourceFileName))) {
        process.stdout.write('Operation failed\n')
    } else {
        const readableStream = createReadStream(sourceFileName)
        const writableStream = createWriteStream(destFileName)
        readableStream.pipe(writableStream).on('finish', async () => {
            await rm(sourceFileName).catch((err) => {
                process.stdout.write('Operation failed\n')
            })
        })
    }
    return process.cwd() + '\n'
}
