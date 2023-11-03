import middy from '@middy/core';
import { SQSEvent, SQSBatchResponse } from 'aws-lambda';
import { injectLambdaContext } from '@aws-lambda-powertools/logger';
import { logger } from './utils';

const produce = async (event: SQSEvent): Promise<SQSBatchResponse> => {
  const response: SQSBatchResponse = {
    batchItemFailures: [],
  };

  for (const record of event.Records) {
    try {
      logger.info('Processing record. Hi mom :)', { record });
    } catch(error) {
      logger.error('Error processing record. Hi MOM :)', { record, error });
      response.batchItemFailures.push({ itemIdentifier: record.messageId });
    }
  }

  return response;
};

export const handler = middy(produce)
  .use(injectLambdaContext(logger, { clearState: true }));
