import os from 'node:os'

export const osOperations = (arg) => {
    switch (arg) {
        case '--EOL':
            return JSON.stringify(os.EOL) + '\n' + process.cwd() + '\n'
        case '--username':
            return os.userInfo().username + '\n' + process.cwd() + '\n'
        case '--homedir':
            return os.homedir() + '\n' + process.cwd() + '\n'
        case '--architecture':
            return os.arch() + '\n' + process.cwd() + '\n'
        case '--cpus':
            return (
                os.cpus().reduce((acc, cpu, index) => {
                    return acc + (index + 1) + ' ' + cpu.model + '\n'
                }, '') +
                process.cwd() +
                '\n'
            )
        default:
            return 'Invalid input' + '\n' + process.cwd() + '\n'
    }
}
