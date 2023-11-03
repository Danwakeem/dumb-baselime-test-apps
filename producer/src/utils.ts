import { Logger } from "@aws-lambda-powertools/logger";

const { STAGE: stage, POWERTOOLS_SERVICE_NAME: serviceName } = process.env;

export const persistentAttributes = [
  'cold_start',
  'function_request_id',
  'slsCorrelationId'
];

export const logger = new Logger({
  serviceName,
  logLevel: stage === 'prod' ? 'info' : 'debug',
  sampleRateValue: stage === 'prod' ? 0.1 : 1,
});
