/* eslint-disable @typescript-eslint/ban-ts-comment */
import { BadRequestException, Injectable } from '@nestjs/common';
import * as fs from 'fs';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const docusign = require('docusign-esign');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const jwtConfig = require('../../jwtConfig.json');
@Injectable()
export class DocusignService {
  private readonly client: any;
  private readonly SCOPES: string[];
  constructor() {
    this.client = new docusign.ApiClient();
    this.SCOPES = ['signature', 'impersonation'];
  }
  getConsent() {
    const urlScopes = this.SCOPES.join('+');

    // Construct consent URL
    const redirectUri = 'https://developers.docusign.com/platform/auth/consent';
    const consentUrl =
      `${jwtConfig.dsOauthServer}/oauth/auth?response_type=code&` +
      `scope=${urlScopes}&client_id=${jwtConfig.dsJWTClientId}&` +
      `redirect_uri=${redirectUri}`;

    console.log(
      'Open the following URL in your browser to grant consent to the application:',
    );

    return consentUrl;
  }

  async authenticate() {
    try {
      const jwtLifeSec = 10 * 60;
      this.client.setOAuthBasePath(
        jwtConfig.dsOauthServer.replace('https://', ''),
      );
      const rsaKey = fs.readFileSync(jwtConfig.privateKeyLocation);

      const results = await this.client.requestJWTUserToken(
        jwtConfig.dsJWTClientId,
        jwtConfig.impersonatedUserGuid,
        this.SCOPES,
        rsaKey,
        jwtLifeSec,
      );
      const accessToken = results.body.access_token;

      // get user info
      const userInfoResults = await this.client.getUserInfo(accessToken);

      // use the default account
      const userInfo = userInfoResults.accounts.find(
        (account) => account.isDefault === 'true',
      );
      console.log(userInfo);
      return {
        accessToken: results.body.access_token,
        apiAccountId: userInfo.accountId,
        basePath: `${userInfo.baseUri}/restapi`,
      };
    } catch (error) {
      console.log(error);
      const body = error.response && error.response.body;
      if (body) {
        // The user needs to grant consent
        if (body.error && body.error === 'consent_required') {
          return { consentUrl: this.getConsent() };
        } else {
          // Consent has been granted. Show status code for DocuSign API error
          const errorMessage = `\nAPI problem: Status code ${
            error.response.status
          }, message body:
        ${JSON.stringify(body, null, 4)}\n\n`;
          console.log(errorMessage);
          throw new BadRequestException(errorMessage);
        }
      }
    }
  }

  async sendDocument() {
    let accountInfo: any;
    const fileId = 10412;
    const fileName = 'My CV';
    const signerEmail = 'ayofalola240@gmail.com';
    const signerName = 'Falola Ibrahim';
    try {
      accountInfo = await this.authenticate();
    } catch (error) {
      return error;
    }
    try {
      const { accessToken, basePath, apiAccountId } = accountInfo;
      this.client.setBasePath(basePath);
      this.client.addDefaultHeader('Authorization', `Bearer ${accessToken}`);

      const envDef = new docusign.EnvelopeDefinition();
      envDef.emailSubject = 'Please sign this document';
      envDef.emailBlurb = 'Please sign this document';
      const filePath = path.join(process.cwd(), `./uploads/${fileId}.pdf`);
      const fileContent = fs.readFileSync(filePath);

      const pdfDoc = new docusign.Document();
      pdfDoc.documentBase64 = fileContent.toString('base64');
      pdfDoc.name = `${fileName}.pdf`;
      pdfDoc.fileExtension = 'pdf';
      pdfDoc.documentId = fileId;
      envDef.documents = [pdfDoc];

      const signer = new docusign.Signer();
      signer.email = signerEmail;
      signer.name = signerName;
      signer.recipientId = '1';
      signer.routingOrder = '1';
      signer.tabs = new docusign.Tabs();
      signer.tabs.signHereTabs = [
        {
          documentId: fileId.toString(),
          pageNumber: '1',
          xPosition: '100',
          yPosition: '100',
        },
      ];
      envDef.recipients = new docusign.Recipients();
      envDef.recipients.signers = [signer];
      envDef.status = 'sent';

      const envelopesApi = new docusign.EnvelopesApi(this.client);
      const envelopeSummary = await envelopesApi.createEnvelope(apiAccountId, {
        envelopeDefinition: envDef,
      });

      return envelopeSummary;
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Something went wrong');
    }
  }
}
