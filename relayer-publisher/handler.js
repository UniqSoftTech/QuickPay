const AWS = require('aws-sdk');
const sns = new AWS.SNS();

const SNS_TOPIC_ARN = process.env.SNS_TOPIC_ARN;

module.exports.publishToRelayers = async (event) => {
  try {
    // Parse the incoming event body
    const body = JSON.parse(event.body);
    const message = body.message;

    if (!message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Message is required' }),
      };
    }

    // Publish the message to SNS
    const params = {
      Message: message,
      TopicArn: SNS_TOPIC_ARN,
    };

    const result = await sns.publish(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Message published successfully',
        messageId: result.MessageId,
      }),
    };
  } catch (error) {
    console.error('Error publishing message:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to publish message' }),
    };
  }
};
