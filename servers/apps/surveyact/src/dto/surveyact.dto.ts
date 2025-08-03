import { InputType, Field, ID } from '@nestjs/graphql';
import { AgreeState } from '@prisma/client';
import { IsDateString, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

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
export class CreateDistrictDTO {
  @Field()
  city: string;

  @Field()
  name: string;
} 

@InputType()
export class CreateSPJDTO {
  @Field(() => ID)
  @IsUUID()
  userId: string;

  @Field(() => ID)
  @IsUUID()
  subSurveyActivityId: string;

  @Field()
  @IsDateString()
  startDate: string;

  @Field()
  @IsDateString()
  endDate: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  eviDocumentUrl?: string;
}

@InputType()
export class UpdateSPJStatusDTO {
  @Field(() => ID)
  id: string;

  @Field(() => AgreeState)
  status: AgreeState;

  @Field({ nullable: true })
  verifyNote?: string;
}

@InputType()
export class CreateJobLetterDTO {
  @Field(() => ID)
  @IsUUID()
  userId: string;

  @Field(() => ID)
  @IsUUID()
  subSurveyActivityId: string;

  @Field()
  @IsString()
  region: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsDateString()
  submitDate?: string;
}

@InputType()
export class UpdateJobLetterStatusDTO {
  @Field(() => ID)
  id: string;

  @Field(() => AgreeState)
  status: AgreeState;

  @Field({ nullable: true })
  rejectNote?: string;
}