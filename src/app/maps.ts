export interface Location {
  city: string;
  ip?: string;
  latitude: string;
  longitude: string;
  region_code?: string;
  principalSubdivision?: string;

}
export interface Position {
  address : {
    country:string;
    country_code:string;
    postcode:string;
    restaurant:string;
    road:string;
    state:string;
    state_district:string;
    suburb:string;
    town:string;
  },
  lat: string;
  lon: string;
}

