import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { AgreeState, StatusST } from '@prisma/client';
import { UserType } from 'apps/users/src/types/users.types';

@ObjectType()
export class SurveyActivityType {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  slug: string;
}

@ObjectType()
export class SubSurveyActivityType {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  slug: string;

  @Field(() => ID)
  surveyActivityId: string;

  @Field()
  startDate: Date;

  @Field()
  endDate: Date;

  @Field()
  targetSample: number;
}

@ObjectType()
export class UserProgressType {
  @Field(() => ID)
  id: string;

  @Field(() => UserType, { nullable: true })
  user?: UserType;

  @Field(() => ID)
  userId: string;

  @Field(() => ID)
  subSurveyActivityId: string;

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

@ObjectType()
export class SubSurveyProgressType {
  @Field(() => Date, { nullable: true })
  startDate?: Date;

  @Field(() => Date, { nullable: true })
  endDate?: Date;

  @Field(() => Int, { nullable: true })
  targetSample?: number;

  @Field(() => Int)
  totalPetugas: number;

  @Field(() => Int)
  submitCount: number;

  @Field(() => Int)
  approvedCount: number;

  @Field(() => Int)
  rejectedCount: number;
}

@ObjectType()
export class DistrictType {
  @Field(() => ID)
  id: string;

  @Field()
  city: string;

  @Field()
  name: string;
}

@ObjectType()
export class SubmitSPJType {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  userId: string;

  @Field(() => ID)
  subSurveyActivityId: string;

  @Field()
  startDate: Date;

  @Field()
  endDate: Date;

  @Field(() => AgreeState)
  submitState: AgreeState;

  @Field()
  submitDate: Date;

  @Field({ nullable: true })
  approveDate?: Date;

  @Field({ nullable: true })
  verifyNote?: string;

  @Field({ nullable: true })
  eviDocumentUrl?: string;

  @Field()
  createdAt: Date;
}

@ObjectType()
export class JobLetterType {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  userId: string;

  @Field(() => ID)
  subSurveyActivityId: string;

  @Field()
  region: string;

  @Field(() => StatusST)
  jobLetterState: StatusST;

  @Field({ nullable: true })
  submitDate?: Date;

  @Field(() => AgreeState)
  agreeState: AgreeState;

  @Field({ nullable: true })
  approveDate?: Date;

  @Field({ nullable: true })
  rejectNote?: string;

  @Field()
  createdAt: Date;
}