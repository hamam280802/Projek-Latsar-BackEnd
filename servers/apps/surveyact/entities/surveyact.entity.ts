import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class SurveyActivity {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  slug: string;
}

@ObjectType()
export class SubSurveyActivity {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  slug: string;

  @Field()
  surveyActivityId: string;
}

@ObjectType()
export class UserProgress {
  @Field()
  id: string;

  @Field()
  userId: string;

  @Field()
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