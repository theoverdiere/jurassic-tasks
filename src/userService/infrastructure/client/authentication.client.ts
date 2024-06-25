import axios from 'axios';

export class KeycloakClient {

  public async createUserInKeycloak(email: string, password: string) {
    const keycloakUrl = 'https://localhost:8080/auth/admin/realms/jurassic_tasks/users';

    const adminToken = await this.getAdminAccessToken();

    console.log('adminToken', adminToken);

    // await axios.post(
    //   keycloakUrl,
    //   {
    //     username: email,
    //     email: email,
    //     enabled: true,
    //     credentials: [
    //       {
    //         type: 'password',
    //         value: password,
    //         temporary: false,
    //       },
    //     ],
    //   },
    //   {
    //     headers: {
    //       Authorization: `Bearer ${adminToken}`,
    //       'Content-Type': 'application/json',
    //     },
    //   },
    // )
  }


  public async signIn(email: string, password: string): Promise<string> {
    //TODO
    return "TODO";
  }

  private async getAdminAccessToken(): Promise<string> {

    const response = await axios.post(
      'http://localhost:8080/realms/jurassic_tasks/protocol/openid-connect/token',
      new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: 'jurassic-tasks-backend',
        client_secret: 'rV3KYfgNdDDkCOGXh1Hv4H3KvoCN6iuY',
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );

    return response.data.access_token;
  }
}

