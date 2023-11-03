import middy from '@middy/core';
import * as api from '@opentelemetry/api';
import { injectLambdaContext } from '@aws-lambda-powertools/logger';
import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";
import { logger } from './utils.js';

const tracer = api.trace.getTracer('my-sexy-tracer');

const sns = new SNSClient({});

const produce = async () => {
  try {
    logger.info('Publishing event');
    await tracer.startActiveSpan('publishEvent', async () => {
      await sns.send(new PublishCommand({
        TopicArn: process.env.TOPIC_ARN,
        Message: JSON.stringify({
          message: 'Hello from producer! Hi mom!',
        }),
      }));
    });

    logger.info('Done publishing :)');
  
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'Event published!'
      }),
    };
  } catch (error) {
    logger.error('Error publishing event', { error });
    return {
      statusCode: 503,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'Could not publish event!'
      }),
    };
  }
};

export const handler = middy(produce)
  .use(injectLambdaContext(logger, { clearState: true }))
  .before(() => {
    const span = api.trace.getActiveSpan();
    const context = span?.spanContext();
    const traceId = context?.traceId;
    logger.setPersistentLogAttributes({ traceId });
  });
