export interface City{
    id: number | string;
    name: string;
    brands: Brands[];
}

export enum Brands{
    "sba", "alvha", "yellow"
}