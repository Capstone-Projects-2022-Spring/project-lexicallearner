// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

function main(bucketName = 'abcd-my-new-bucket') {
    // [START storage_quickstart]
    // Imports the Google Cloud client library
    const {Storage} = require('@google-cloud/storage');

    // For more information on ways to initialize Storage, please see
    // https://googleapis.dev/nodejs/storage/latest/Storage.html

    // Creates a client using Application Default Credentials
    const storage = new Storage();

    // Creates a client from a Google service account key
    // const storage = new Storage({keyFilename: 'key.json'});

    /**
     * TODO(developer): Uncomment these variables before running the sample.
     */
    // The ID of your GCS bucket
    // const bucketName = 'your-unique-bucket-name';

    async function createBucket() {
        // Creates the new bucket
        await storage.createBucket(bucketName);
        console.log(`Bucket ${bucketName} created.`);
    }

    createBucket().catch(console.error);
    // [END storage_quickstart]
}

main(...process.argv.slice(2));