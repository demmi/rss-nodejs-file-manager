import { parseArgs } from './utils/args.js'
import { createInterface } from 'node:readline'
import os from 'node:os'

const currentUser = parseArgs()

async function greeting(username) {
    process.stdout.write(`Welcome to the File Manager, ${username}!\n`)
}

async function runner() {
    await greeting(currentUser)

    const inputInterface = createInterface({
        input: process.stdin,
        output: process.stdout,
    })

    inputInterface.on('line', async (input) => {
        const command = input.trim()
        switch (command) {
            case '.exit':
                inputInterface.write(
                    `Thank you for using File Manager, ${currentUser}!`
                )
                process.exit()
                break
            case 'os --EOL':
                inputInterface.write(JSON.stringify(os.EOL) + '\n')
                break
            case 'os --username':
                inputInterface.write(os.userInfo().username + '\n')
                break
            case 'os --homedir':
                inputInterface.write(os.homedir() + '\n')
                break
            case 'os --architecture':
                inputInterface.write(os.arch() + '\n')
                break
            case 'os --cpus':
                os.cpus().forEach((cpu) =>
                    inputInterface.write(cpu.model + '\n')
                )
                break
        }
    })

    inputInterface.on('SIGINT', () => {
        inputInterface.write(
            `Thank you for using File Manager, ${currentUser}!`
        )
        process.exit()
    })
}

runner()
