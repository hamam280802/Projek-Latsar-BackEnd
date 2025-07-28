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
export class UpdateSurveyActivityDTO {
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
export class CreateSubSurveyActivityDTO {
  @Field()
  name: string;

  @Field()
  slug: string;

  @Field()
  surveyActivityId: string;

  @Field()
  startDate: Date;

  @Field()
  endDate: Date;

  @Field()
  targetSample: number;
}

@InputType()
export class UpdateSubSurveyActivityDTO {
  @Field()
  name: string;

  @Field()
  slug: string;

  @Field()
  surveyActivityId: string;

  @Field()
  startDate: Date;  

  @Field()
  endDate: Date;

  @Field()
  targetSample: number;
}

@InputType()
export class CreateUserProgressDTO {
  @Field()
  subSurveyActivityId: string;

  @Field()
  userId: string;

  @Field()
  totalAssigned: number;

  @Field()
  submitCount: number;

  @Field()
  approvedCount: number;

  @Field()
  rejectedCount: number;

  @Field()
  lastUpdated: Date;
}

@InputType()
export class UpdateUserProgressDTO {
  @Field()
  subSurveyActivityId: string;

  @Field()
  userId: string;  

  @Field()
  totalAssigned: number;

  @Field()
  submitCount: number;

  @Field()
  approvedCount: number;

  @Field()
  rejectedCount: number;

  @Field()
  lastUpdated: Date;
}
