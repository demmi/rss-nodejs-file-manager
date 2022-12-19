import path from 'node:path'
import { access, readFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'

export const calculateHash = async (filename) => {
    if (!filename) {
        return 'Invalid input\n' + process.cwd() + '\n'
    }
    const fileToHash = path.resolve(process.cwd(), filename)
    const exist = async (fileName) => {
        try {
            await access(fileName)
            return true
        } catch (err) {
            return false
        }
    }
    if (!(await exist(fileToHash))) {
        return 'Operation failed\n' + process.cwd() + '\n'
    }
    const hashFile = await readFile(fileToHash)
    const result = createHash('sha256').update(fileToHash).digest('hex')
    return result + '\n' + process.cwd() + '\n'
}
