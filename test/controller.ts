import {Singleton} from '@glasswing/common'
import {Controller} from '@glasswing/controller'
import {Body,Cookie,Header,Param,Query, RespondWith, RespondWithJson, RespondWithRaw, RespondWithYaml} from '@glasswing/http'
import {Get,Post} from '@glasswing/router'

@Controller()
@Singleton()
export class TestController {

  @Get('/test-get')
  public testGet() {
    return 'test'
  }

  @Get('/test-get-respond-json')
  @RespondWithJson()
  public testGetRespondJson() {
    return {}
  }

  @Get('/test-get-respond-raw')
  @RespondWithRaw()
  public testGetRespondRaw() {
    return {}
  }

  @Get('/test-get-respond-yaml')
  @RespondWithYaml()
  public testGetRespondYaml() {
    return {}
  }


  @Get('/test-qet-url-var/:id')
  public getGetUrlVar(@Param('id') id: number) {
    return id
  }

  @Get('/test-get-query-var')
  public testGetQueryVar(@Query('id') id: number) {
    return id
  }

  @Get('/test-get-header-var')
  public testGetHeaderVar(@Header('id') id: number) {
    return id
  }

  @Get('/test-get-cookie-var')
  public testGetCookieVar(@Cookie('id') id: number) {
    return id
  }

  @Post('/test-post-body-var')
  public testPostBodyVar(@Body('id') id: number) {
    return id
  }

}
