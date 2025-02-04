import {
	S3Client,
	PutObjectCommand
} from '@aws-sdk/client-s3'

const BUCKET_BASE_URL = `https://${VUE_APP_BUCKET_REGION}.digitaloceanspaces.com/`
const BUCKET_URL = `https://${VUE_APP_BUCKET_NAME}.${VUE_APP_BUCKET_REGION}.digitaloceanspaces.com/`

const client = new S3Client({
	region: VUE_APP_BUCKET_REGION,
	forcePathStyle: false, // Configures to use subdomain/virtual calling format.
	endpoint: BUCKET_BASE_URL,
	credentials: {
		accessKeyId: VUE_APP_DIGITAL_OCEAN_KEY,
		secretAccessKey: VUE_APP_DIGITAL_OCEAN_SECRET
	}
})

export const upload = async (file, folder_name) => {
	try {
		if (!file) throw new Error('No file provided')

		const upload_params = {
			Bucket: VUE_APP_BUCKET_NAME,
			Key: `${folder_name}/${crypto.randomUUID()}`,
			Body: file,
			ContentType: file.type,
			ACL: 'public-read'
		}

		await client.send(new PutObjectCommand(upload_params))

		// Return the uploaded file's URL
		return BUCKET_URL + upload_params.Key
	} catch (error) {
		console.error(error)
		throw error
	}
}
