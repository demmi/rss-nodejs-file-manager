import { access, rename } from 'node:fs/promises'
import path from 'node:path'

export const renameFile = async (file, newFile) => {
    if (!file || !newFile) {
        return 'Invalid input\n' + process.cwd() + '\n'
    }
    const fileName = path.resolve(process.cwd(), file)
    const newFileName = path.resolve(process.cwd(), newFile)

    const exist = async (fileName) => {
        try {
            await access(fileName)
            return true
        } catch (err) {
            return false
        }
    }
    if ((await exist(newFileName)) || !(await exist(fileName))) {
        process.stdout.write('Operation failed\n')
    } else {
        await rename(fileName, newFileName).catch((err) => {
            console.log(err)
            if (err.code === 'ENOENT') {
                process.stdout.write('Operation failed\n')
            }
        })
    }
    return process.cwd() + '\n'
}
