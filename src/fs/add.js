import path from 'node:path'
import { open } from 'node:fs/promises'

export const createFile = async (filename) => {
    if (!filename) {
        return 'Invalid input\n' + process.cwd() + '\n'
    }
    const fileToCreate = path.resolve(process.cwd(), filename)
    await open(fileToCreate, 'wx').catch((err) => {
        if (err.code === 'EEXIST') {
            process.stdout.write('Operation failed\n')
        }
    })
    return process.cwd() + '\n'
}
