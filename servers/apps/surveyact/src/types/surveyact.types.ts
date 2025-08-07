import { ObjectType, Field, ID, Int, registerEnumType } from '@nestjs/graphql';
import { AgreeState, StatusST } from '@prisma/client';
import { UserType } from 'apps/users/src/types/users.types';

registerEnumType(AgreeState, {
  name: 'AgreeState', // ini akan muncul di GraphQL schema
});

registerEnumType(StatusST, {
  name: 'StatusST',
})

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
export class DistrictType {
  @Field(() => ID)
  id: string;

  @Field()
  city: string;

  @Field()
  name: string;
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

  @Field(() => SubSurveyActivityType, { nullable: true })
  subSurveyActivity?: SubSurveyActivityType;

  @Field(() => ID)
  districtId: string;

  @Field(() => DistrictType, { nullable: true })
  district?: DistrictType;

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
  @Field(() => String)
  Name: string;

  @Field(() => ID)
  subSurveyActivityId: string;

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
export class SubmitSPJType {
  @Field(() => ID)
  id: string;

  @Field(() => UserType, { nullable: true })
  user?: UserType;

  @Field(() => ID)
  userId: string;

  @Field(() => SubSurveyActivityType)
  subSurveyActivity?: SubSurveyActivityType;

  @Field(() => ID)
  subSurveyActivityId: string;

  @Field(() => AgreeState)
  submitState: AgreeState;

  @Field(() => Date, { nullable: true })
  submitDate: Date | null;

  @Field(() => Date, { nullable: true })
  approveDate: Date | null;

  @Field(() => String, { nullable: true })
  verifyNote: string | null;

  @Field(() => String, { nullable: true })
  eviDocumentUrl: string | null;

  @Field()
  createdAt: Date;
}

@ObjectType()
export class JobLetterType {
  @Field(() => ID)
  id: string;

  @Field(() => UserType, { nullable: true })
  user?: UserType;
  
  @Field(() => ID)
  userId: string;

  @Field(() => SubSurveyActivityType)
  subSurveyActivity?: SubSurveyActivityType;

  @Field(() => ID)
  subSurveyActivityId: string;

  @Field()
  region: string;

  @Field(() => Date, { nullable: true })
  submitDate: Date | null;

  @Field(() => AgreeState)
  agreeState: AgreeState;

  @Field(() => Date, { nullable: true })
  approveDate: Date | null;

  @Field(() => String, { nullable: true })
  rejectNote: string | null;

  @Field(() => String, { nullable: true })
  eviFieldUrl: string | null;

  @Field(() => String, { nullable: true })
  eviSTUrl: string | null;

  @Field()
  createdAt: Date;
}

@ObjectType()
export class MonthlyStatsType {
  @Field(() => Int)
  totalJobLetters: number;

  @Field(() => Int)
  totalSPJ: number;

  @Field(() => Int)
  totalActiveUsers: number;
}
