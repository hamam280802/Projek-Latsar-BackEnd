import { Module } from '@nestjs/common';
import { SurveyActivityService } from './surveyacts.service';
import { SurveyActivityResolver } from './surveyact.resolver';
import { PrismaService } from '../../../prisma/prisma.service';
import { GraphQLModule, registerEnumType } from '@nestjs/graphql';
import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { HttpModule } from '@nestjs/axios';
import { AgreeState, StatusST } from '@prisma/client';

registerEnumType(AgreeState, {
  name: 'AgreeState',
  description: 'Status pengajuan SPJ',
});

registerEnumType(StatusST, {
  name: 'StatusST',
  description: 'Status surat tugas',
});

@Module({
  imports: [
    HttpModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
      },
      context: ({ req }) => ({ req }),
    }),
  ],
  providers: [SurveyActivityService, SurveyActivityResolver, PrismaService],
})
export class SurveyActModule {}
