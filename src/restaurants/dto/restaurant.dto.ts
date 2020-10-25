export class RestaurantDto {
  readonly createdAt: Date;
  readonly location: string;
  readonly name: string;
  readonly phone: string;
  readonly searchName: string;
  readonly specifics: string[];
  readonly tags: string[];
  readonly id?: string;
}
