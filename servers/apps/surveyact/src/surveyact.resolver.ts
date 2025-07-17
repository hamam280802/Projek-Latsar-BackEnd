import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SurveyActivityService } from './surveyacts.service';
import { SubSurveyActivityType, SurveyActivityType } from './types/surveyact.types';
import { CreateSubSurveyActivityInput, CreateSurveyActivityDTO } from './dto/surveyact.dto';

@Resolver(() => SurveyActivityType)
export class SurveyActivityResolver {
  constructor(private readonly service: SurveyActivityService) {}

  @Query(() => SurveyActivityType, { name: 'surveyActivityBySlug' })
  async surveyActivityBySlug(@Args('slug') slug: string) {
    return this.service.findBySlug(slug);
  }

  @Query(() => [SurveyActivityType], { name: 'allSurveyActivities' })
  async allSurveyActivities() {
    return this.service.findAll();
  }

  @Mutation(() => SurveyActivityType)
  async createSurveyActivity(@Args('input') input: CreateSurveyActivityDTO) {
    return this.service.create(input);
  }

  @Mutation(() => SubSurveyActivityType)
  async createSubSurveyActivity(
    @Args('input') input: CreateSubSurveyActivityInput,
  ) {
    return this.service.createSubSurveyActivity(input);
  }
}
