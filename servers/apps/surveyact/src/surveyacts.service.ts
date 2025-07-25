import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import {
  CreateSubSurveyActivityDTO,
  CreateSurveyActivityDTO,
  UpdateSubSurveyActivityDTO,
  UpdateSurveyActivityDTO,
} from './dto/surveyact.dto';

@Injectable()
export class SurveyActivityService {
  constructor(private readonly prisma: PrismaService) {}

  async create(input: CreateSurveyActivityDTO) {
    return this.prisma.surveyActivity.create({ data: input });
  }

  async update(surveyActivityId: string, updateData: UpdateSurveyActivityDTO) {
    const cleanedData = Object.fromEntries(
      Object.entries(updateData).filter(([_, value]) => value != null),
    );

    return this.prisma.surveyActivity.update({
      where: { id: surveyActivityId },
      data: cleanedData,
    });
  }

  // Update survei by id
  // async update(id: string, input: UpdateSurveyActivityInput) {
  //   return this.prisma.surveyActivity.update({
  //     where: { id },
  //     data: input,
  //   });
  // }

  async findBySlug(slug: string) {
    const survey = await this.prisma.surveyActivity.findUnique({
      where: { slug },
      // include: { issues: true, User: true } // aktifkan jika mau relasi
    });
    if (!survey) throw new NotFoundException('SurveyActivity not found');
    return survey;
  }

  async findAll() {
    return this.prisma.surveyActivity.findMany();
  }

  async createSubSurveyActivity(input: CreateSubSurveyActivityDTO) {
    return this.prisma.subSurveyActivity.create({
      data: input,
    });
  }

  async updateSubSurveyActivity(subSurveyActivityId: string, updateData: UpdateSubSurveyActivityDTO) {
    const cleanedData = Object.fromEntries(
      Object.entries(updateData).filter(([_, value]) => value != null),
    );
    return this.prisma.subSurveyActivity.update({
      where: { id: subSurveyActivityId },
      data: cleanedData,
    });
  }

  async findSubSurveyActivityBySlug(slug: string) {
    const subSurveyActivity = await this.prisma.subSurveyActivity.findUnique({
      where: { slug },
    });
    if (!subSurveyActivity)
      throw new NotFoundException('SubSurveyActivity not found');
    return subSurveyActivity;
  }

  async findSubSurveyActivityTypeBySurveyActivityId(surveyActivityId: string) {
    return this.prisma.subSurveyActivity.findMany({
      where: { surveyActivityId },
    });
  }

  async getSubSurveyProgress(subSurveyActivityId: string) {
    const subSurvey = await this.prisma.subSurveyActivity.findUnique({
      where: { id: subSurveyActivityId },
      include: {
        UserProgress: true,
        User: true,
      },
    });

    if (!subSurvey) {
      throw new NotFoundException('SubSurveyActivity tidak ditemukan');
    }

    const totalPetugas = subSurvey.User.length;
    const submitCount = subSurvey.UserProgress.reduce(
      (acc, p) => acc + p.submitCount,
      0,
    );
    const approvedCount = subSurvey.UserProgress.reduce(
      (acc, p) => acc + p.approvedCount,
      0,
    );
    const rejectedCount = subSurvey.UserProgress.reduce(
      (acc, p) => acc + p.rejectedCount,
      0,
    );

    return {
      startDate: subSurvey.startDate,
      endDate: subSurvey.endDate,
      targetSample: subSurvey.targetSample,
      totalPetugas,
      submitCount,
      approvedCount,
      rejectedCount,
    };
  }
}
