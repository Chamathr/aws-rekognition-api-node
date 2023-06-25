const { RekognitionClient, DetectLabelsCommand } = require('@aws-sdk/client-rekognition');
const { awsConfigurations } = require('../config/vision.config')

/**
 * call aws rekognition api and return data
 * @param {*} imageFile 
 * @returns 
 */
const visionService = async (imageFile) => {
    /*rekogntion client configuration*/
    const rekognitionClient = new RekognitionClient({
        region: awsConfigurations.region,
        credentials: {
            accessKeyId: awsConfigurations.accessKeyId,
            secretAccessKey: awsConfigurations.secretAccessKey
        }
    });

    const rekognitionParams = {
        Image: {
            Bytes: imageFile.data
        },
        MaxLabels: 10,
        MinConfidence: 80
    };

    try {
        const data = await rekognitionClient.send(new DetectLabelsCommand(rekognitionParams));
        const labels = data.Labels.map(label => label.Name);
        /*return the labels as response*/
        return labels
    } catch (error) {
        /*throw the image processing error*/
        throw new Error("An error occurred while processing the image'")
    }
}

module.exports = { visionService }