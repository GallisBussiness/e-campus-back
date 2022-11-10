/* eslint-disable prettier/prettier */
import { ForbiddenError } from '@casl/ability';
import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CaslAbilityFactory } from './casl-ability.factory';
import { POLICY_KEY, RequiredRule } from './policy.decorator';

@Injectable()
export class CaslGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private caslAbilityFactory: CaslAbilityFactory,
      ) {}
    
      async canActivate(context: ExecutionContext): Promise<boolean> {
        const rules =
          this.reflector.get<RequiredRule[]>(
            POLICY_KEY,
            context.getHandler(),
          ) || [];
    
        const { user } = context.switchToHttp().getRequest();
        const ability = this.caslAbilityFactory.createForUser(user);

        try {
            rules.forEach(rule => ForbiddenError.from(ability).setMessage('accés interdit !!').throwUnlessCan(rule.action, rule.subject));
            return true;
         }
        catch (err) {
            if(err instanceof ForbiddenError) throw new ForbiddenException(err);(err.message);
        }
        
}
}
