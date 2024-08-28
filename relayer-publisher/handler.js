const AWS = require('aws-sdk');
const sns = new AWS.SNS();

const SNS_TOPIC_ARN = "invoice-mongolia";

module.exports.publishToRelayers = async (event) => {
  try {
    // Parse the incoming event body
    const body = JSON.parse(event.body);
    const qrData = body.qrData;

    if (!qrData) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'QR data is required' }),
      };
    }

    // Publish the QR data to SNS
    const params = {
      Message: JSON.stringify(qrData),
      TopicArn: SNS_TOPIC_ARN,
    };

    const result = await sns.publish(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'QR data published successfully',
        messageId: result.MessageId,
      }),
    };
  } catch (error) {
    console.error('Error publishing QR data:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to publish QR data' }),
    };
  }
};
