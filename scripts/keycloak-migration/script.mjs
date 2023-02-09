import KcAdminClient from "@keycloak/keycloak-admin-client";
import { DecisionStrategy } from '@keycloak/keycloak-admin-client/lib/defs/policyRepresentation.js';
import dotenv from "dotenv";
import fs from "fs";

dotenv.config(); // read .env files into process.env

const config = {
  kcHost: process.env?.KEYCLOAK_HOST,
  kcRealm: process.env?.KEYCLOAK_REALM,
  kcClientId: process.env?.KEYCLOAK_CLIENT_ID,
  kcClientSecret: process.env?.KEYCLOAK_CLIENT_SECRET,
};

async function connectKeyCloak() {
  const kcAdminClient = new KcAdminClient({
    baseUrl: `${config.kcHost}/auth`,
    realmName: config.kcRealm,
  });

  try {
    await kcAdminClient.auth({
      clientId: config.kcClientId || "",
      clientSecret: config.kcClientSecret,
      grantType: "client_credentials",
    });
  } catch (e) {
    console.log(e);
    process.exit();
  }

  return kcAdminClient;
}

async function run() {
  const kcClient = await connectKeyCloak();

  // Create authorization for service
  const authorization = JSON.parse(fs.readFileSync("./scripts/keycloak-migration/auth.json", "utf8"));

  // Get id of client
  const clients = await kcClient.clients.find({
    clientId: config.kcClientId,
  });
  const id = clients?.[0]?.id;
  if (!id) {
    console.log(`Client with id ${config.kcClientId} does not exist`);
    process.exit(1);
  }

  // Create roles or get exists
  console.log("Creating realm roles ....");
  const roles = await Promise.all(
    authorization.roles.map(async (name) => {
      try {
        return await kcClient.roles.create({ name });
      } catch (e) {
        console.log(e.response.data.errorMessage);
        return kcClient.roles.findOneByName({ name });
      }
    })
  );

  const roleMap = roles.reduce(
    (prev, curr) => ({ ...prev, [curr.name]: curr.id }),
    {}
  );

  // Create scopes or get exists
  console.log("Creating authorization scopes ....");
  const scopes = await Promise.all(
    authorization.scopes.map(async (name) => {
      return kcClient.clients.createAuthorizationScope({ id }, { name });
    })
  );

  const scopeMap = scopes.reduce(
    (prev, curr) => ({ ...prev, [curr.name]: curr.id }),
    {}
  );

  // Create policy or get exists
  console.log("Creating policies ....");
  const policies = await Promise.all(
    authorization.policies.map(async (policy) => {
      try {
        return await kcClient.clients.createPolicy({ id, type: "role" }, {
          name: policy.name,
          type: "role",
          roles: policy.roles.map((role) => ({
            id: roleMap?.[role],
          })),
        });
      } catch (e) {
        console.log(e.response.data.error);
        return await kcClient.clients.findPolicyByName({
          id,
          name: policy.name,
        });
      }
    })
  );

  const policyMap = policies.reduce(
    (prev, curr) => ({ ...prev, [curr.name]: curr.id }),
    {}
  );

  //Create resources and permissions
  console.log("Create resources and permissions ....");
  const resources = await kcClient.clients.listResources({ id: id });
    await Promise.all(
      resources.map(async (res) => {
        return kcClient.clients.delResource({ id: id, resourceId: res._id });
      })
    );

  await Promise.all(
    authorization.resources.map(async (resource) => {
      let res;
      // Create or get exist resource
      try {
        res = await kcClient.clients.createResource(
          { id },
          {
            name: resource.name,
            displayName: resource.displayName,
            uris: [resource.name],
            scopes: resource.scope.map((scope) => ({
              name: scope,
            })),
          }
        );
      } catch (e) {
        console.log(e.response?.data?.error_description);
        const listRes = await kcClient.clients.getResource({
          id,
          name: resource.name,
        });
        res = (listRes)[0];
      }

      // Create permissions for resource
      try {
        await Promise.all(
          resource.permissions.map(async (permission) => {
            return kcClient.clients.createPermission(
              { id, type: "scope" },
              {
                name: permission?.name || `${res.name}_${permission.scope}`,
                resources: [res._id],
                policies: permission.policies.map(
                  (policy) => policyMap?.[policy]
                ),
                scopes: [scopeMap?.[permission.scope]],
                decisionStrategy: DecisionStrategy.AFFIRMATIVE,
              }
            );
          })
        );
      } catch (e) {
        console.log(e.response?.data?.error);
      }
    })
  );

  console.log("Done");
}

run();
