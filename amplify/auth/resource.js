import { defineAuth, secret } from '@aws-amplify/backend';
/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
    loginWith: {
        email: true,
        externalProviders: {
            google: {
                clientId: secret('GOOGLE_CLIENT_ID'),
                clientSecret: secret('GOOGLE_CLIENT_SECRET'),
                scopes: ['email', 'profile', 'openid'],
                attributeMapping: {
                    email: 'email',
                    givenName: 'given_name',
                    familyName: 'family_name',
                    profilePicture: 'picture',
                },
            },
            callbackUrls: [
                'http://localhost:3000/',
                'http://localhost:3000/dashboard/ecommerce',
                // Production domain URLs
                'https://www.template.chinchilla-ai.com/',
                'https://www.template.chinchilla-ai.com/dashboard/ecommerce',
            ],
            logoutUrls: [
                'http://localhost:3000/authentication/sign-in',
                // Production domain URL
                'https://www.template.chinchilla-ai.com/authentication/sign-in',
            ],
        },
    },
    userAttributes: {
        email: {
            required: true,
            mutable: true,
        },
        givenName: {
            required: false,
            mutable: true,
        },
        familyName: {
            required: false,
            mutable: true,
        },
        profilePicture: {
            required: false,
            mutable: true,
        },
    },
    groups: ['ADMINS'],
});
