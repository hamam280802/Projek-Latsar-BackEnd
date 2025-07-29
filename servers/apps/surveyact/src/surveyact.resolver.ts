import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SurveyActivityService } from './surveyacts.service';
import {
  DistrictType,
  SubSurveyActivityType,
  SubSurveyProgressType,
  SurveyActivityType,
  UserProgressType,
} from './types/surveyact.types';
import {
  CreateDistrictDTO,
  CreateSubSurveyActivityDTO,
  CreateSurveyActivityDTO,
  CreateUserProgressDTO,
  UpdateSubSurveyActivityDTO,
  UpdateSurveyActivityDTO,
  UpdateUserProgressDTO,
} from './dto/surveyact.dto';

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

  @Mutation(() => SurveyActivityType)
  async updateSurveyActivity(
    @Args('surveyActivityId') surveyActivityId: string,
    @Args('input') input: UpdateSurveyActivityDTO,
  ) {
    return this.service.update(surveyActivityId, input);
  }

  @Mutation(() => SubSurveyActivityType)
  async createSubSurveyActivity(
    @Args('input') input: CreateSubSurveyActivityDTO,
  ) {
    return this.service.createSubSurveyActivity(input);
  }

  @Mutation(() => SubSurveyActivityType)
  async updateSubSurveyActivity(
    @Args('subSurveyActivityId') subSurveyActivityId: string,
    @Args('input') input: UpdateSubSurveyActivityDTO,
  ) {
    return this.service.updateSubSurveyActivity(subSurveyActivityId, input);
  }

  @Query(() => [SubSurveyActivityType])
  async subSurveyActivityById(
    @Args('surveyActivityId') surveyActivityId: string,
  ) {
    return this.service.findSubSurveyActivityTypeBySurveyActivityId(
      surveyActivityId,
    );
  }

  @Query(() => SubSurveyActivityType, { name: 'subSurveyActivityBySlug' })
  async subSurveyActivityBySlug(@Args('slug') slug: string) {
    return this.service.findSubSurveyActivityBySlug(slug);
  }

  @Mutation(() => UserProgressType)
  async createUserProgress(@Args('input') input: CreateUserProgressDTO) {
    return this.service.createUserProgress(input);
  }

  @Query(() => SubSurveyProgressType)
  async subSurveyProgress(
    @Args('subSurveyActivityId') subSurveyActivityId: string,
  ) {
    return this.service.getSubSurveyProgress(subSurveyActivityId);
  }

  @Mutation(() => UserProgressType)
  async updateUserProgress(
    @Args('surveyProgressId') surveyProgressId: string,
    @Args('input') input: UpdateUserProgressDTO,
  ) {
    return this.service.updateUserProgress(surveyProgressId, input);
  }

  @Mutation(() => DistrictType)
  async createDistrict(@Args('input') input: CreateDistrictDTO) {
    return this.service.createDistrict(input);
  }

  @Query(() => [DistrictType], { name: 'allDistricts' })
  async allDistricts() {
    return this.service.getAllDistricts();
  }
}
