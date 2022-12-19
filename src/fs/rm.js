import path from 'node:path'
import { access, rm } from 'node:fs/promises'

export const deleteFile = async (file) => {
    if (!file) {
        return 'Invalid input\n' + process.cwd() + '\n'
    }
    const fileName = path.resolve(process.cwd(), file)
    const exist = async (fileName) => {
        try {
            await access(fileName)
            return true
        } catch (err) {
            return false
        }
    }
    if (await exist(fileName)) {
        await rm(fileName).catch((err) => {
            process.stdout.write('Operation failed\n')
        })
    } else {
        return 'Operation failed\n' + process.cwd() + '\n'
    }
    return process.cwd() + '\n'
}
