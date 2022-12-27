import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Uploaded File' })
export class UploadedFile {
  @Field()
  originalname: string;

  @Field()
  filename: string;

  @Field()
  location: string;
}
