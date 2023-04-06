import { IPlace } from "./types";

export const mockPlace: IPlace = {
  id: "1",
  address: {
    id: 2,
    country: "Polska",
    lat: 50,
    lon: 20,
    street: "Karmelicka",
    number: "13",
    city: "Kraków",
  },
  tags: ["tanio", "szybko", "dobrze"],
  distance: 3,
  gallery: {
    photos: [
      {
        photo: "https://picsum.photos/800",
        photo_thumbnail: "https://picsum.photos/200",
        date_created: "2023-02-24T12:57:24.609370Z",
        date_modified: "2023-02-24T12:57:24.609393Z",
      },
      {
        photo: "https://picsum.photos/800",
        photo_thumbnail: "https://picsum.photos/200",
        date_created: "2023-02-24T12:57:24.609370Z",
        date_modified: "2023-02-24T12:57:24.609393Z",
      },
    ],
    main_photo: {
      photo: "https://picsum.photos/800",
      photo_thumbnail: "https://picsum.photos/200",
      date_created: "2023-02-24T12:57:24.609370Z",
      date_modified: "2023-02-24T12:57:24.609393Z",
    },
  },
  title: "Don Pizzeria",
  description: "opis do Don Pizzerii",
  rate: 3,
  link: "https://google.com",
  owner: {
    username: "user",
  },
};

export const mockPlaces: IPlace[] = [
  mockPlace,
  mockPlace,
  mockPlace,
  mockPlace,
  mockPlace,
  mockPlace,
  mockPlace,
];
