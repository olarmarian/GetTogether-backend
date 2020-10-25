import { ObjectSchema } from '@hapi/joi';
import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { Restaurant } from '../interfaces/restaurant.interface';

@Injectable()
export class RestaurantValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema<Restaurant>) {}

  transform(value: any) {
    
    const { error } = this.schema.validate(value);
    
    if (error) {
      throw new BadRequestException('Validation failed');
    }
    return value;
  }
}
