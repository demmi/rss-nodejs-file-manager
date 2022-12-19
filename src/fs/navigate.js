import { readdir } from 'node:fs/promises'
import path from 'node:path'

export const list = async (directory) => {
    const dirList = await readdir(directory, { withFileTypes: true }).catch(
        (err) => {
            if (err.code === 'ENOENT') {
                return 'Operation failed' + process.cwd() + '\n'
            }
        }
    )
    const directories = dirList
        .filter((elem) => elem.isDirectory())
        .map((el) => ({ Name: el.name, Type: 'directory' }))
        .sort((a, b) => a.Name.localeCompare(b.Name))
    const files = dirList
        .filter((elem) => elem.isFile())
        .map((el) => ({ Name: el.name, Type: 'file' }))
        .sort((a, b) => a.Name.localeCompare(b.Name))

    console.table([...directories, ...files])
    console.log(process.cwd())
}

export const changeDirectory = async (directory) => {
    if (!directory) {
        return 'Invalid input\n' + process.cwd() + '\n'
    }
    let newPath = path.resolve(process.cwd(), directory)
    try {
        process.chdir(newPath)
        return process.cwd() + '\n'
    } catch (err) {
        return 'Operation failed\n' + process.cwd() + '\n'
    }
}
