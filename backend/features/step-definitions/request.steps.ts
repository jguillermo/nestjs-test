import { after, before, binding, given, then, when } from 'cucumber-tsflow';
import { INestApplication } from '@nestjs/common';
import * as pactum from 'pactum';
import * as Spec from 'pactum/src/models/Spec';
import { toJson } from './tools/string-tools';
import { NestTestModule } from './tools/nest-test-module';

@binding()
export class RequestSteps {
  private app: INestApplication;
  private spec: Spec;

  @before()
  public async beforeAllScenarios() {
    this.app = await NestTestModule.create();
    this.spec = pactum.spec();
  }

  @after()
  public async afterAllScenarios() {
    await this.app.close();
  }

  @when('I make a request to graphql')
  public i_make_a_request_to_graphql(payload: string) {
    this.spec.post(NestTestModule.url).withGraphQLQuery(payload);
  }

  @when('I validate the response is')
  public async i_validate_the_response_is(response: string) {
    const responseJson = toJson(response);

    await this.spec.expectJson(responseJson);
  }

  @then('response should have a status {int}')
  public i_get_a_status_code_response(statusCode: number) {
    this.spec.response().should.have.status(statusCode);
  }
}
