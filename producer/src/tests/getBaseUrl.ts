const {
  CloudFormationClient,
  DescribeStacksCommand
} = require("@aws-sdk/client-cloudformation");

export const getBaseUrl = async () => {
  try {
    const client = new CloudFormationClient({
      region: 'us-east-1',
    });
    const command = new DescribeStacksCommand({
      StackName: `producer-${process.env.STAGE}`,
    });
    const { Stacks } = await client.send(command);
    return Stacks[0].Outputs.find(({ OutputKey }) => OutputKey === 'HttpApiUrl').OutputValue;
  } catch(error) {
    console.log(error);
    return '';
  }
};

