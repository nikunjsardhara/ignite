const aws = require('aws-sdk')
const s3 = require('aws-sdk/clients/s3')

const accessKeyId = process.env.WASABI_ACCESS_KEY_ID
const secretAccessKey = process.env.WASABI_SECRET_ACCESS_KEY
const wasabiEndpoint = new aws.Endpoint(process.env.WASABI_ENDPOINT)

const wasabiBucket = new s3({
  accessKeyId,
  secretAccessKey,
  endpoint: wasabiEndpoint,
})

module.exports = {
  wasabiBucket
}


