import {
  Body,
  Controller,
  Get,
  Put,
  HttpException,
  HttpStatus,
  Param,
  Post,
  HttpCode,
  UsePipes,
  Delete,
} from '@nestjs/common';
import { Restaurant } from './interfaces/restaurant.interface';
import { RestaurantValidationPipe } from './pipes/restaurant-validation.pipe';
import { RestaurantsService } from './restaurants.service';
import { RestaurantSchema } from './validation-schema/restaurant.schema';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Get()
  @HttpCode(201)
  getRestaurants(): Promise<Restaurant[]> {
    console.log('Read restaurants.');
    return this.restaurantsService.findAll();
  }

  @Get(':id')
  getRestaurant(@Param('id') id: string): Promise<Restaurant> {
    console.log(`Read restaurant with id: ${id}`);
    return this.restaurantsService.findById(id);
  }

  @Post()
  @UsePipes(new RestaurantValidationPipe(RestaurantSchema))
  createRestaurant(@Body() restaurant: Restaurant): any {
    console.log(`Create restaurant: `, restaurant);
    return this.restaurantsService
      .createRestaurant(restaurant)
      .then(() => {
        return HttpStatus.CREATED;
      })
      .catch(err => {
        return new HttpException(err, HttpStatus.BAD_REQUEST);
      });
  }

  @Put()
  @UsePipes(new RestaurantValidationPipe(RestaurantSchema))
  updateRestaurant(@Body() restaurant: Restaurant): any {
    console.log(`Update restaurant with id: ${restaurant.id}`);
    return this.restaurantsService
      .updateRestaurant(restaurant)
      .then(() => {
        return HttpStatus.ACCEPTED;
      })
      .catch(err => {
        return new HttpException(err, HttpStatus.BAD_REQUEST);
      });
  }

  @Delete(':id')
  async deleteRestaurant(@Param('id') id: string) {
    console.log(`Delete restaurant with id: ${id}`);
    return this.restaurantsService
      .deleteRestaurant(id)
      .then(() => {
        return HttpStatus.ACCEPTED;
      })
      .catch(err => {
        return new HttpException(err, HttpStatus.BAD_REQUEST);
      });
  }
}
