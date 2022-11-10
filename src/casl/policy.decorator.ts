/* eslint-disable prettier/prettier */
import { SetMetadata } from '@nestjs/common';
import { Action, Subjects } from './casl-ability.factory';

export interface RequiredRule {
  action: Action;
  subject: Subjects;
}

export const POLICY_KEY = 'POLICY_KEY';

export const CheckAbility = (...requirements: RequiredRule[]) =>
  SetMetadata(POLICY_KEY, requirements);
