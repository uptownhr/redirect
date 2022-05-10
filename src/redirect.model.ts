import { IsNotEmpty, IsString } from 'class-validator';

export class RedirectModel {
  id: string;
}

export class CreateRedirectInput {
  @IsNotEmpty()
  @IsString()
  urlPath: string;

  @IsNotEmpty()
  @IsString()
  targetUrl: string;
}
