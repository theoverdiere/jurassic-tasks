import { KeycloakConnectOptions, PolicyEnforcementMode } from 'nest-keycloak-connect';

const keycloakConfig: KeycloakConnectOptions = {
  authServerUrl: 'https://localhost:8080/auth', // Url authent keycloak
  realm: 'jurassic_tasks',
  clientId: 'jurassic-tasks-backend',
  secret: 'rV3KYfgNdDDkCOGXh1Hv4H3KvoCN6iuY', 
  useNestLogger: true, // Utilise le logger Nest pour les messages Keycloak
  bearerOnly: true, // Pour les applications de type API REST
  // Activer l'interception des requêtes pour vérifier les rôles et les permissions
  policyEnforcement: PolicyEnforcementMode.ENFORCING 
};

export default keycloakConfig;