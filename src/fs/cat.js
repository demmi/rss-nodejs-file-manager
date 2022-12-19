import { createReadStream } from 'node:fs'

import path from 'node:path'

export const read = async (filename) => {
    if (!filename) {
        return 'Invalid input\n' + process.cwd() + '\n'
    }
    const fileToRead = path.resolve(process.cwd(), filename)
    let readStream = createReadStream(fileToRead)
    readStream
        .on('open', () => readStream.pipe(process.stdout))
        .on('end', () => process.stdout.write('\n' + process.cwd() + '\n'))
        .on('error', () =>
            process.stdout.write('Operation failed\n' + process.cwd() + '\n')
        )
}
