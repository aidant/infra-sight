const epoch = BigInt(new Date('2020-01-01').getTime())
const start = BigInt(new Date().getTime()) - process.hrtime.bigint() / 1000000n
const timestamp = () => start + process.hrtime.bigint() / 1000000n - epoch
export const stamptime = () => 18446744073709551615n - timestamp()
