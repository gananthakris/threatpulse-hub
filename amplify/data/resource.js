import { a, defineData } from '@aws-amplify/backend';
import { authUsers } from '../functions/auth-users/resource.js';
import { authGroups } from '../functions/auth-groups/resource.js';
/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any unauthenticated user can "create", "read", "update",
and "delete" any "Todo" records.
=========================================================================*/
const schema = a.schema({
    Todo: a
        .model({
        content: a.string(),
        isDone: a.boolean(),
        priority: a.enum(['LOW', 'MEDIUM', 'HIGH']),
    })
        .authorization((allow) => [allow.guest()]),
    Product: a
        .model({
        name: a.string().required(),
        description: a.string(),
        price: a.float(),
        category: a.string(),
        inStock: a.boolean(),
        rating: a.float(),
    })
        .authorization((allow) => [allow.guest()]),
    // Custom types for auth operations
    UserInfo: a.customType({
        username: a.string(),
        email: a.string(),
        givenName: a.string(),
        familyName: a.string(),
        profilePicture: a.string(),
        status: a.string(),
        enabled: a.boolean(),
        createdAt: a.string(),
        lastModified: a.string(),
        attributes: a.json(),
    }),
    GroupInfo: a.customType({
        name: a.string(),
        description: a.string(),
        precedence: a.integer(),
        createdAt: a.string(),
        lastModified: a.string(),
    }),
    UserInput: a.customType({
        email: a.string(),
        givenName: a.string(),
        familyName: a.string(),
        profilePicture: a.string(),
        temporaryPassword: a.string(),
        suppressEmail: a.boolean(),
        limit: a.integer(),
        paginationToken: a.string(),
        filter: a.string(),
    }),
    GroupInput: a.customType({
        description: a.string(),
        precedence: a.integer(),
        limit: a.integer(),
        paginationToken: a.string(),
    }),
    // User management operations
    authUserQuery: a
        .query()
        .arguments({
        operation: a.string().required(),
        userId: a.string(),
        input: a.ref('UserInput'),
    })
        .returns(a.customType({
        user: a.ref('UserInfo'),
        users: a.ref('UserInfo').array(),
        groups: a.ref('GroupInfo').array(),
        paginationToken: a.string(),
        success: a.boolean(),
    }))
        .authorization((allow) => [
        allow.authenticated(),
        allow.groups(['ADMINS']),
    ])
        .handler(a.handler.function(authUsers)),
    // Group management operations
    authGroupMutation: a
        .mutation()
        .arguments({
        operation: a.string().required(),
        groupName: a.string(),
        userId: a.string(),
        input: a.ref('GroupInput'),
    })
        .returns(a.customType({
        group: a.ref('GroupInfo'),
        groups: a.ref('GroupInfo').array(),
        users: a.ref('UserInfo').array(),
        paginationToken: a.string(),
        success: a.boolean(),
    }))
        .authorization((allow) => [allow.groups(['ADMINS'])])
        .handler(a.handler.function(authGroups)),
});
export const data = defineData({
    schema,
    authorizationModes: {
        defaultAuthorizationMode: 'identityPool',
    },
});
/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/
/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/
/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/
/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()
// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
