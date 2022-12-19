import { parseArgs } from './utils/args.js'
import { createInterface } from "node:readline";

const currentUser = parseArgs()
async function greeting(username) {
    process.stdout.write(`Welcome to the File Manager, ${username}!\n`);
}

async function runner() {
    await greeting(currentUser)

    const inputInterface = createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    inputInterface.on('SIGINT', () => {
        inputInterface.write(`Thank you for using File Manager, ${currentUser}!`)
        process.exit()
    })
}

runner()
