import { parseArgs } from './utils/args.js'
import { createInterface } from 'node:readline'
import os from 'node:os'
import { homeDir, list } from './fs/navigate.js'
import { osOperations } from './os/os.js'

const currentUser = parseArgs()
let currDir = homeDir()

async function runner() {
    const inputInterface = createInterface({
        input: process.stdin,
        output: process.stdout,
    })

    inputInterface.write(`Welcome to the File Manager, ${currentUser}!\n`)

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
                    await list(currDir)
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
