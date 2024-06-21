import * as AWS from 'aws-sdk';
AWS.config.update({ region: 'us-east-1' });

const ssm = new AWS.SSM();

interface DatabaseCredentials {
    host: string;
    user: string;
    password: string;
    name: string;
}

async function getParameter(name: string, withDecryption: boolean = true): Promise<string> {
    const params = {
        Name: name,
        WithDecryption: withDecryption
    };
    const response = await ssm.getParameter(params).promise();
    return response.Parameter?.Value || '';
}

async function getDatabaseCredentials(): Promise<DatabaseCredentials> {
    const credentialsString = await getParameter('/90minutes/dev/services/package/database_credentials');
    return JSON.parse(credentialsString);
}

async function getMapsApiKey(): Promise<string> {
    return await getParameter('/90minutes/dev/services/package/MAPSAPIKEY');
}

export { getMapsApiKey, getDatabaseCredentials, DatabaseCredentials };
