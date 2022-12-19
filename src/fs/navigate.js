import os from 'node:os'
import { readdir } from 'node:fs/promises'

export const homeDir = () => {
    return os.homedir()
}

export const list = async (directory) => {
    const dirList = await readdir(directory, { withFileTypes: true }).catch(
        (err) => {
            if (err.code === 'ENOENT') {
                return 'Operation failed'
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
}
