import { Injectable } from '@nestjs/common';
import { FirebaseConfigService } from 'src/firebase-config/firebase-config.service';
import { Restaurant } from './interfaces/restaurant.interface';

@Injectable()
export class RestaurantsService {
  private COLLECTION_NAME = 'locals';

  constructor(private readonly firebaseService: FirebaseConfigService) {}

  async findById(id: string): Promise<Restaurant> {
    let restaurant: Restaurant;

    await this.firebaseService
      .getFirestore()
      .doc(`/${this.COLLECTION_NAME}/${id}`)
      .get()
      .then(restaurantDoc => {
        restaurant = {
          createdAt: restaurantDoc.get('createdAt'),
          name: restaurantDoc.get('name'),
          searchName: restaurantDoc.get('searchName'),
          location: restaurantDoc.get('location'),
          phone: restaurantDoc.get('phone'),
          specifics: restaurantDoc.get('specific'),
          tags: restaurantDoc.get('tags'),
          id: restaurantDoc.id,
        };
      });

    return restaurant;
  }

  async findAll(): Promise<Restaurant[]> {
    const restaurants = [];
    await this.firebaseService
      .getFirestore()
      .collection(`${this.COLLECTION_NAME}`)
      .get()
      .then(collection => {
        console.log(`Found ${collection.docs.length} restaurants.`);
        collection.docs.forEach(restaurant => {
          restaurants.push({
            createdAt: restaurant.data().createdAt,
            location: restaurant.data().location,
            name: restaurant.data().name,
            phone: restaurant.data().phone,
            searchName: restaurant.data().searchName,
            specifics: restaurant.data().specific,
            tags: restaurant.data().tags,
            id: restaurant.id,
          });
        });
      });

    return restaurants;
  }

  async createRestaurant(restaurant: Restaurant) {
    return await this.firebaseService
      .getFirestore()
      .collection(this.COLLECTION_NAME)
      .add(restaurant);
  }

  async updateRestaurant(restaurant: Restaurant) {
    return await this.firebaseService
      .getFirestore()
      .doc(`/${this.COLLECTION_NAME}/${restaurant.id}`)
      .set(restaurant);
  }

  async deleteRestaurant(id: string) {
    return await this.firebaseService
      .getFirestore()
      .doc(`${this.COLLECTION_NAME}/${id}`)
      .delete();
  }
}
