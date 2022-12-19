import { parseArgs } from './utils/args.js'
import { createInterface } from 'node:readline'
import os from 'node:os'
import { changeDirectory, list } from './fs/navigate.js'
import { osOperations } from './os/os.js'
import path from 'node:path'
import { read } from './fs/cat.js'
import { createFile } from './fs/add.js'
import { renameFile } from './fs/rn.js'
import { copyFile } from './fs/cp.js'
import { moveFile } from './fs/mv.js'
import { deleteFile } from './fs/rm.js'

const currentUser = parseArgs()
let currDir = os.homedir()
process.chdir(currDir)

async function runner() {
    const inputInterface = createInterface({
        input: process.stdin,
        output: process.stdout,
    })

    inputInterface.write(`Welcome to the File Manager, ${currentUser}!\n`)
    inputInterface.write(process.cwd() + '\n')

    inputInterface
        .on('line', async (input) => {
            const command = input.trim().split(' ')
            switch (command[0]) {
                case '.exit':
                    inputInterface.write(
                        `Thank you for using File Manager, ${currentUser}!`
                    )
                    process.exit()
                    break
                case 'os':
                    inputInterface.write(osOperations(command[1]))
                    break
                case 'ls':
                    await list(process.cwd())
                    break
                case 'up':
                    currDir = path.resolve(process.cwd(), '..')
                    process.chdir(currDir)
                    inputInterface.write(process.cwd() + '\n')
                    break
                case 'cd':
                    inputInterface.write(await changeDirectory(command[1]))
                    break
                case 'cat':
                    inputInterface.write(await read(command[1]))
                    break
                case 'add':
                    inputInterface.write(await createFile(command[1]))
                    break
                case 'rn':
                    inputInterface.write(
                        await renameFile(command[1], command[2])
                    )
                    break
                case 'cp':
                    inputInterface.write(await copyFile(command[1], command[2]))
                    break
                case 'mv':
                    inputInterface.write(await moveFile(command[1], command[2]))
                    break
                case 'rm':
                    inputInterface.write(await deleteFile(command[1]))
                    break
            }
        })
        .on('SIGINT', () => {
            inputInterface.write(
                `Thank you for using File Manager, ${currentUser}!`
            )
            process.exit()
        })
}

runner()
