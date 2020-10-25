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
import { RestaurantDto } from './dto/restaurant.dto';
import { Restaurant } from './interfaces/restaurant.interface';
import { RestaurantValidationPipe } from './pipes/restaurant-validation.pipe';
import { RestaurantsService } from './restaurants.service';
import { RestaurantSchema } from './validation-schema/restaurant.schema';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Get()
  @HttpCode(201)
  getRestaurants(): Promise<RestaurantDto[]> {
    console.log('Read restaurants.');
    return this.restaurantsService.findAll();
  }

  @Get(':id')
  getRestaurant(@Param('id') id: string): Promise<RestaurantDto> {
    console.log(`Read restaurant with id: ${id}`);
    return this.restaurantsService.findById(id);
  }

  @Post()
  @UsePipes(new RestaurantValidationPipe(RestaurantSchema))
  createRestaurant(@Body() restaurantDto: RestaurantDto): any {
    console.log(`Create restaurant: `, restaurantDto);

    const restaurant: Restaurant = this.convertDtoToRestaurant(restaurantDto);
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
  updateRestaurant(@Body() restaurantDto: RestaurantDto): any {
    console.log(`Update restaurant with id: ${restaurantDto.id}`);

    const restaurant: Restaurant = this.convertDtoToRestaurant(restaurantDto);
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

  convertDtoToRestaurant(restaurant: RestaurantDto): Restaurant {
    return {
      id: restaurant.id,
      createdAt: restaurant.createdAt,
      location: restaurant.location,
      name: restaurant.location,
      phone: restaurant.phone,
      searchName: restaurant.searchName,
      specifics: restaurant.specifics,
      tags: restaurant.tags,
    };
  }

  convertRestaurantToDto(restaurant: Restaurant): RestaurantDto {
    return {
      id: restaurant.id,
      createdAt: restaurant.createdAt,
      location: restaurant.location,
      name: restaurant.location,
      phone: restaurant.phone,
      searchName: restaurant.searchName,
      specifics: restaurant.specifics,
      tags: restaurant.tags,
    };
  }
}
