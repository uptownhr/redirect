import { IsNotEmpty, IsString } from 'class-validator';

export class RedirectModel {
  id: number;
  targetUrl: string;
}

export class CreateRedirectInput {
  @IsNotEmpty()
  @IsString()
  urlPath: string;

  @IsNotEmpty()
  @IsString()
  targetUrl: string;
}
