import { Body, Controller, Get, HttpException, HttpStatus, Logger, Post, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { Unprotected } from 'nest-keycloak-connect';

@Controller('authenticationTest')
@Unprotected() 
export class AuthenticationTestController {

  /**
  * Controlleur de test pour avoir un token (application ou utilisateur)
   */

  private readonly logger = new Logger(AuthenticationTestController.name);

  private readonly clientId: string;
  private readonly  clientSecret: string;
  private readonly  authServerUrl: string;
  private readonly  realm: string;
  private readonly  tokenUrl: string;

  constructor(private configService: ConfigService) {
    this.clientId = this.configService.get<string>('KEYCLOAK_CLIENT_ID');
    this.clientSecret = this.configService.get<string>('KEYCLOAK_CLIENT_SECRET');
    this.authServerUrl = this.configService.get<string>('KEYCLOAK_URL');
    this.realm = this.configService.get<string>('KEYCLOAK_REALM');
    this.tokenUrl = `${this.authServerUrl}/realms/${this.realm}/protocol/openid-connect/token`;
  }

  @Post('userToken')
  async getUserToken(@Body() loginDto: { email: string; password: string }) {
    console.log('login', loginDto);

    try {
      const response = await axios.post(
        this.tokenUrl,
        new URLSearchParams({
          client_id: this.clientId,
          client_secret: this.clientSecret,
          grant_type: 'password',
          username : loginDto.email,
          password: loginDto.password,
        }).toString(),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );

      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response ? error.response.data : 'Unknown error',
        error.response ? error.response.status : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }


  @Get('clientApplicationToken')
  async getApplicationClientToken(): Promise<{ token: string }> {

    try {
      const response = await axios.post(
        this.tokenUrl,
        new URLSearchParams({
          client_id:  this.clientId,
          client_secret: this.clientSecret,
          grant_type: 'client_credentials',
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );

      const token = response.data.access_token;
      return { token };
    } catch (error) {
      this.logger.error('Failed to get token from Keycloak', error);
      throw error;
    }
  }
}