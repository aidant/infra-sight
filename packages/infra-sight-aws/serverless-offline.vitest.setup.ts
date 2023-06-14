import { fork } from 'node:child_process'
import { createInterface as createReadline } from 'node:readline/promises'

export default async () => {
  const child = fork(
    './node_modules/serverless/bin/serverless.js',
    ['offline', '--stage', 'test'],
    {
      stdio: 'pipe',
    }
  )

  const stdout = createReadline({
    input: child.stdout!,
  })
  const stderr = createReadline({
    input: child.stderr!,
  })

  if (process.env['DEBUG']) {
    stdout.on('line', (line) => console.log(line))
    stderr.on('line', (line) => console.error(line))
  }

  await {
    then: (resolve: () => void, reject: (error: Error) => void) => {
      const callback = (line: string) => {
        if (/error/i.test(line)) {
          stdout.off('line', callback)
          stderr.off('line', callback)
          reject(new Error('serverless offline failed to start'))
        } else if (/server ready:/i.test(line)) {
          stdout.off('line', callback)
          stderr.off('line', callback)
          resolve()
        }
      }

      stdout.on('line', callback)
      stderr.on('line', callback)
    },
  }

  return async () => {
    await {
      then: (resolve: () => void) => {
        child.once('exit', () => resolve())
        child.kill('SIGTERM')
      },
    }
  }
}
