export class CreateListingDto {
  title: string;
  description: string;
  price: number;
  cover: string;
  images: string;
  keywords: string;
  city: string;
  address: string;
  code: string;
  priceType: string;
  rentType: number;
  roomCount: number;
  bathroomCount: number;
  livingroomCount: number;
  houseType: string;
  area: number;
  direction: string;
  floor: number;
  totalFloor: number;
  buildYear: number;
  bedroomFacilities: string;
  advantage: string;
  availableFrom: Date;
  availableUntil: Date;
  nearbyInfo: string;
  isRetail: boolean;
  landlordId: string;
}