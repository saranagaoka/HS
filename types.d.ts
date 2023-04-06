export interface IPhoto {
  photo: string;
  photo_thumbnail: string;
  date_created: string;
  date_modified: string;
}

export interface IPlace {
  id: string;
  address: {
    id: number;
    country: string;
    lat: number;
    lon: number;
    street: string;
    number: string;
    city: string;
  };
  tags: string[];
  distance?: number;
  gallery: {
    photos: IPhoto[];
    main_photo: IPhoto;
  };
  date_created?: number;
  title: string;
  description?: string;
  rate?: number;
  link?: string;
  owner: {
    username: string;
  };
  likes: number;
}

export interface IFolder {
  id: number;
  name: string;
  public: boolean;
  includes_spot: boolean;
  spots_count: number;
}

export interface IApiResponse<T> {
  count: number;
  next: string;
  previous: string;
  results: T[];
}

export interface IPlacesApiResponse {
  count: number;
  next: string;
  previous: string;
  results: IPlace[];
}

export interface ICoordsApiResponse {
  city?: string;
  lat?: number;
  lon?: number;
  text: string;
}

export interface IDetailsApiResponse {
  city?: string;
  lat: number;
  lon: number;
  text?: string;
  city?: string;
  number?: string;
}
