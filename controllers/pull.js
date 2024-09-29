const fs = require('fs').promises;
const path = require("path");
const { s3, S3_BUCKET } = require("../config/aws-config");

async function pullRepo() {
    const repoPath = path.resolve(process.cwd(), ".apnaGit");
    const commitsPath = path.join(repoPath, "commits");

    try {
        const data = await s3.listObjectsV2({
            Bucket: S3_BUCKET,
            Prefix: "commits/",
        }).promise();

        const objects = data.Contents;

        for (const object of objects) {
            const key = object.Key; // Use 'Key' instead of 'key'
            const relativePath = key.replace("commits/", ""); // Remove 'commits/' prefix
            const commitDir = path.join(commitsPath, path.dirname(relativePath));

            await fs.mkdir(commitDir, { recursive: true });

            const params = {
                Bucket: S3_BUCKET,
                Key: key, // Use 'Key' instead of 'key'
            };

            const fileContent = await s3.getObject(params).promise();
            const localFilePath = path.join(commitsPath, relativePath); // Write to the local path

            await fs.writeFile(localFilePath, fileContent.Body);

        }

        console.log("All commits pulled from S3.");
    } catch (err) {
        console.error("Unable to pull: ", err);
    }
}

module.exports = { pullRepo };
