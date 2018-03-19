import { fetchHello } from './services/hello.service';

export const hello = async (event, context, callback) => {
  const message = await fetchHello();

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Servxerless boilerplate..',
      input: event,
      message,
    }),
  };

  callback(null, response);
};

// Help function to generate an IAM policy
const generatePolicy = (principalId, effect, resource) => {
  const authResponse = {};

  authResponse.principalId = principalId;

  if (effect && resource) {
      const policyDocument = {};
      policyDocument.Version = '2012-10-17';
      policyDocument.Statement = [];
      const statementOne = {};
      statementOne.Action = 'execute-api:Invoke';
      statementOne.Effect = effect;
      statementOne.Resource = resource;
      policyDocument.Statement[0] = statementOne;
      authResponse.policyDocument = policyDocument;
  }

  // // Optional output with custom properties of the String, Number or Boolean type.
  // authResponse.context = {
  //     "stringKey": "stringval",
  //     "numberKey": 123,
  //     "booleanKey": true
  // };
  return authResponse;
}

export const auth = function(event, context, callback) {
  // used for JWT `Bearer tokenxx` format
  const token = event.authorizationToken.split(' ')[1];

  switch (token.toLowerCase()) {
      case 'allow':
          callback(null, generatePolicy('user', 'Allow', event.methodArn));
          break;
      case 'deny':
          callback(null, generatePolicy('user', 'Deny', event.methodArn));
          break;
      case 'unauthorized':
          callback('Unauthorized'); // Return a 401 Unauthorized response
          break;
      default:
          callback('Error: Invalid token');
  }
};

