import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import OpenAI from 'openai';

@ValidatorConstraint({ async: true })
export class IsModeratedConstraint implements ValidatorConstraintInterface {
  private readonly openai: OpenAI | null = null;

  constructor() {
    const apiKey = process.env.OPENAI_API_KEY;
    if (apiKey) {
      this.openai = new OpenAI({apiKey});
    }
  }

  validate(text: string) {
    return this.isModerated(text);
  }

  private async isModerated(input: string) {
    if (!this.openai) {
      return true;
    }

    const response = await this.openai.moderations.create({
      model: 'omni-moderation-latest',
      input,
    });
    if (response.results.length > 0) {
      return !response.results[0].flagged;
    }
    return true;
  }
}

export function IsModerated(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: {
        message: 'This text is not allowed because it violates our policies',
        ...validationOptions,
      },
      constraints: [],
      validator: IsModeratedConstraint,
    });
  };
}
