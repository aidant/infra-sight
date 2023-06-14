import S3 from 's3rver'

const server = new S3({
  silent: !process.env['DEBUG'],
  resetOnClose: true,
  configureBuckets: [
    {
      name: 'infra-sight-test-bucket',
      configs: [
        `
            <CORSConfiguration>
              <CORSRule>
                <AllowedHeader></AllowedHeader>
                <AllowedMethod>GET</AllowedMethod>
                <AllowedOrigin>*</AllowedOrigin>
                <ExposeHeader></ExposeHeader>
              </CORSRule>
            </CORSConfiguration>
          `,
      ],
    },
  ],
})

server.run().then(() => process.send('ready'))

process.on('SIGTERM', async () => {
  await server.close()
  process.exit(0)
})
