import jwt from 'jsonwebtoken';

const generatePolicy = function(principalId, effect, resource, user) {
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
    if(user) {

        authResponse.context = user

    }    

    return authResponse;
}

const authorizer = function(event, context, callback) {
    const token = event.headers.authorization;

    try {   

        const user = jwt.verify(token, process.env.JWT_SECRET);

        console.log(user, 'user')

        callback(null, generatePolicy('user', 'Allow', event.routeArn, user));

    }catch (e) {
        console.error(e)
        callback(null, generatePolicy('user', 'Deny', event.routeArn));   
    }
}

export { authorizer }