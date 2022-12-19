import { parseArgs } from './utils/args.js'
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
import { calculateHash } from './hash/hash.js'
import { compress, decompress } from './zip/zip.js'

const currentUser = parseArgs()
let currDir = os.homedir()
process.chdir(currDir)

async function runner() {
    process.stdout.write(`Welcome to the File Manager, ${currentUser}!\n`)
    process.stdout.write(process.cwd() + '\n')

    process.stdin.on('data', async (input) => {
        const command = input.toString().trim().split(' ')
        switch (command[0]) {
            case '.exit':
                process.stdout.write(
                    `Thank you for using File Manager, ${currentUser}!`
                )
                process.exit()
                break
            case 'os':
                process.stdout.write(osOperations(command[1]))
                break
            case 'ls':
                await list(process.cwd())
                break
            case 'up':
                currDir = path.resolve(process.cwd(), '..')
                process.chdir(currDir)
                process.stdout.write(process.cwd() + '\n')
                break
            case 'cd':
                process.stdout.write(await changeDirectory(command[1]))
                break
            case 'cat':
                process.stdout.write(await read(command[1]))
                break
            case 'add':
                process.stdout.write(await createFile(command[1]))
                break
            case 'rn':
                process.stdout.write(await renameFile(command[1], command[2]))
                break
            case 'cp':
                process.stdout.write(await copyFile(command[1], command[2]))
                break
            case 'mv':
                process.stdout.write(await moveFile(command[1], command[2]))
                break
            case 'rm':
                process.stdout.write(await deleteFile(command[1]))
                break
            case 'hash':
                process.stdout.write(await calculateHash(command[1]))
                break
            case 'compress':
                process.stdout.write(await compress(command[1], command[2]))
                break
            case 'decompress':
                process.stdout.write(await decompress(command[1], command[2]))
                break
            default:
                process.stdout.write('Invalid input\n' + process.cwd() + '\n')
        }
    })
    process.on('SIGINT', () => {
        process.stdout.write(
            `Thank you for using File Manager, ${currentUser}!`
        )
        process.exit()
    })
}

runner()
