import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateSurveyActivityDTO {
  @Field()
  @IsNotEmpty({ message: 'Nama kategori survei wajib diisi' })
  @IsString()
  name: string;

  @Field()
  @IsNotEmpty({ message: 'Slug wajib diisi' })
  @IsString()
  slug: string;
}

@InputType()
export class CreateSubSurveyActivityInput {
  @Field()
  name: string;

  @Field()
  slug: string;

  @Field()
  surveyActivityId: string;
}
