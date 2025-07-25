import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

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
}

@ObjectType()
export class UserProgressType {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  userId: string;

  @Field(() => ID)
  subSurveyActivityId?: string;

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
