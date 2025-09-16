import { type ClientSchema, a, defineData } from '@aws-amplify/backend';
import { authUsers } from '../functions/auth-users/resource.js';
import { authGroups } from '../functions/auth-groups/resource.js';
// import { collectMalwareSamples } from '../functions/collect-malware-samples/resource.js';

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any unauthenticated user can "create", "read", "update", 
and "delete" any "Todo" records.
=========================================================================*/
const schema = a.schema({
  // Malware Sample Model
  MalwareSample: a
    .model({
      sha256Hash: a.string().required(),
      sha1Hash: a.string(),
      md5Hash: a.string(),
      fileName: a.string(),
      fileSize: a.integer(),
      fileType: a.string(),
      fileTypeMime: a.string(),
      signature: a.string(),
      clamav: a.string(),
      firstSeen: a.datetime(),
      lastSeen: a.datetime(),
      reporter: a.string(),
      originCountry: a.string(),
      imphash: a.string(),
      tlsh: a.string(),
      telfhash: a.string(),
      gimphash: a.string(),
      dhashIcon: a.string(),
      tags: a.string().array(),
      deliveryMethod: a.string(),
      intelligence: a.json(),
      threatScore: a.integer(),
      threatLevel: a.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']),
    })
    .secondaryIndexes((index) => [
      index('signature').sortKeys(['firstSeen']).queryField('listBySigature'),
      index('originCountry').sortKeys(['firstSeen']).queryField('listByCountry'),
    ])
    .authorization((allow) => [allow.publicApiKey(), allow.authenticated()]),

  // Analysis Result Model
  AnalysisResult: a
    .model({
      sampleHash: a.string().required(),
      analysisType: a.enum(['AUTOMATED', 'MANUAL', 'SANDBOX', 'AI']),
      threatScore: a.integer(),
      threatLevel: a.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']),
      behavioralIndicators: a.json(),
      networkIndicators: a.json(),
      fileIndicators: a.json(),
      mitreTechniques: a.string().array(),
      notes: a.string(),
      analysisDate: a.datetime().required(),
    })
    .authorization((allow) => [allow.publicApiKey(), allow.authenticated()]),

  // Indicator of Compromise Model
  IOC: a
    .model({
      sampleHash: a.string().required(),
      iocType: a.enum(['IP', 'DOMAIN', 'URL', 'EMAIL', 'FILE_HASH', 'REGISTRY', 'MUTEX']),
      iocValue: a.string().required(),
      confidence: a.integer(),
      firstObserved: a.datetime(),
      lastObserved: a.datetime(),
      isActive: a.boolean(),
    })
    .authorization((allow) => [allow.publicApiKey(), allow.authenticated()]),

  // Collection Run Model for tracking automated collections
  CollectionRun: a
    .model({
      startTime: a.datetime().required(),
      endTime: a.datetime(),
      status: a.enum(['RUNNING', 'COMPLETED', 'FAILED']),
      samplesCollected: a.integer(),
      newSamples: a.integer(),
      config: a.json(),
      errors: a.json(),
    })
    .authorization((allow) => [allow.publicApiKey(), allow.authenticated()]),

  // Dashboard Statistics Model
  DashboardStats: a
    .model({
      date: a.date().required(),
      totalSamples: a.integer(),
      uniqueFamilies: a.integer(),
      highThreatCount: a.integer(),
      topMalwareFamilies: a.json(),
      topCountries: a.json(),
      dailyTrend: a.json(),
    })
    .authorization((allow) => [allow.publicApiKey(), allow.authenticated()]),

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
    .returns(
      a.customType({
        user: a.ref('UserInfo'),
        users: a.ref('UserInfo').array(),
        groups: a.ref('GroupInfo').array(),
        paginationToken: a.string(),
        success: a.boolean(),
      })
    )
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
    .returns(
      a.customType({
        group: a.ref('GroupInfo'),
        groups: a.ref('GroupInfo').array(),
        users: a.ref('UserInfo').array(),
        paginationToken: a.string(),
        success: a.boolean(),
      })
    )
    .authorization((allow) => [allow.groups(['ADMINS'])])
    .handler(a.handler.function(authGroups)),

  // Malware Collection Mutation - Temporarily disabled for sandbox deployment
  // collectMalwareSamples: a
  //   .mutation()
  //   .arguments({
  //     queryType: a.enum(['RECENT', 'TAG', 'SIGNATURE', 'FILE_TYPE']),
  //     queryValue: a.string(),
  //     limit: a.integer(),
  //   })
  //   .returns(
  //     a.customType({
  //       success: a.boolean(),
  //       message: a.string(),
  //       samplesCollected: a.integer(),
  //       totalSamples: a.integer(),
  //       queryType: a.string(),
  //       queryValue: a.string(),
  //     })
  //   )
  //   .authorization((allow) => [allow.publicApiKey(), allow.authenticated()])
  //   .handler(a.handler.function(collectMalwareSamples)),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'apiKey',
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
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
