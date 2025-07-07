import { ObjectType, Field, Directive } from '@nestjs/graphql';

@ObjectType()
@Directive('@key(fields: "id")')
export class Avatars {
  @Field()
  id: string;
  @Field()
  public_id: string;
  @Field()
  url: string;
  @Field()
  userId: string;
}

@ObjectType()
@Directive('@key(fields: "id")')
export class SurveyActivity {
  @Field()
  id: string;
  @Field()
  name: string;
}

@ObjectType()
export class User {
  @Field()
  id: string;
  @Field()
  name: string;
  @Field()
  email: string;
  @Field()
  password: string;
  @Field(() => Avatars, { nullable: true })
  avatar?: Avatars | null;
  @Field()
  role: string;
  @Field(() => String, { nullable: true })
  address?: string | null;
  @Field({ nullable: true })
  phone_number: string;
  @Field(() => String, {nullable: true})
  region?: string | null;
  @Field(() => SurveyActivity, { nullable: true })
  surveyActivity?: SurveyActivity;
  createdAt: Date;
  @Field()
  updatedAt: Date;
}

@ObjectType()
export class Issue {
  @Field()
  id: string;
  @Field()
  content: string;
  @Field()
  status: string;
  @Field()
  createdAt: Date;
  @Field()
  updatedAt: Date;
  @Field()
  userId: string;
  @Field(() => User)
  user: User;
  @Field()
  surveyActivityId: string;
  @Field(() => SurveyActivity)
  surveyActivity: SurveyActivity;
  @Field()
  region: string;
}

@ObjectType()
export class IssueComment {
  @Field()
  id: string;
  @Field()
  content: string;
  @Field()
  createdAt: Date;
  @Field()
  userId: string;
  @Field(() => User)
  user: User;
  @Field()
  issueId: string;
  @Field(() => Issue)
  issue: Issue;
}