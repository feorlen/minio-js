/*
 * Minio Javascript Library for Amazon S3 Compatible Cloud Storage, (C) 2015 Minio, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var Minio = require('minio')
var Fs = require('fs')

// find out your s3 end point here:
// http://docs.aws.amazon.com/general/latest/gr/rande.html#s3_region

var s3Client = new Minio({
  endPoint: 'https://<your-s3-endpoint>',
  accessKey: 'YOUR-ACCESSKEYID',
  secretKey: 'YOUR-SECRETACCESSKEY'
})

// large object from file
var file = 'testfile'
var fileStream = Fs.createReadStream(file)
var fileStat = Fs.stat(file, function(e, stat) {
  if (e) {
    return console.log(e)
  }
  s3Client.putObject('bucket', 'object', 'application/octet-stream', stat.size, fileStream, function(e) {
    if (e) {
      return console.log(e)
    }
    console.log("Success")
  })
})