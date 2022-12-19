import os from 'node:os'

export const osOperations = (arg) => {
    switch (arg) {
        case '--EOL':
            return JSON.stringify(os.EOL) + '\n'
        case '--username':
            return os.userInfo().username + '\n'
        case '--homedir':
            return os.homedir() + '\n'
        case '--architecture':
            return os.arch() + '\n'
        case '--cpus':
            return os.cpus().reduce((acc, cpu, index) => {
                return acc + (index + 1) + ' ' + cpu.model + '\n'
            }, '')
        default:
            return 'Invalid input' + '\n'
    }
}
