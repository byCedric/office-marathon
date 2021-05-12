/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateLocationsInput = {
  id?: string | null,
  timestamp: number,
  latitude: string,
  longitude: string,
};

export type ModelLocationsConditionInput = {
  timestamp?: ModelIntInput | null,
  latitude?: ModelStringInput | null,
  longitude?: ModelStringInput | null,
  and?: Array< ModelLocationsConditionInput | null > | null,
  or?: Array< ModelLocationsConditionInput | null > | null,
  not?: ModelLocationsConditionInput | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type Locations = {
  __typename: "Locations",
  id?: string,
  timestamp?: number,
  latitude?: string,
  longitude?: string,
  createdAt?: string,
  updatedAt?: string,
};

export type UpdateLocationsInput = {
  id: string,
  timestamp?: number | null,
  latitude?: string | null,
  longitude?: string | null,
};

export type DeleteLocationsInput = {
  id?: string | null,
};

export type ModelLocationsFilterInput = {
  id?: ModelIDInput | null,
  timestamp?: ModelIntInput | null,
  latitude?: ModelStringInput | null,
  longitude?: ModelStringInput | null,
  and?: Array< ModelLocationsFilterInput | null > | null,
  or?: Array< ModelLocationsFilterInput | null > | null,
  not?: ModelLocationsFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelLocationsConnection = {
  __typename: "ModelLocationsConnection",
  items?:  Array<Locations | null > | null,
  nextToken?: string | null,
};

export type CreateLocationsMutationVariables = {
  input?: CreateLocationsInput,
  condition?: ModelLocationsConditionInput | null,
};

export type CreateLocationsMutation = {
  createLocations?:  {
    __typename: "Locations",
    id: string,
    timestamp: number,
    latitude: string,
    longitude: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateLocationsMutationVariables = {
  input?: UpdateLocationsInput,
  condition?: ModelLocationsConditionInput | null,
};

export type UpdateLocationsMutation = {
  updateLocations?:  {
    __typename: "Locations",
    id: string,
    timestamp: number,
    latitude: string,
    longitude: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteLocationsMutationVariables = {
  input?: DeleteLocationsInput,
  condition?: ModelLocationsConditionInput | null,
};

export type DeleteLocationsMutation = {
  deleteLocations?:  {
    __typename: "Locations",
    id: string,
    timestamp: number,
    latitude: string,
    longitude: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetLocationsQueryVariables = {
  id?: string,
};

export type GetLocationsQuery = {
  getLocations?:  {
    __typename: "Locations",
    id: string,
    timestamp: number,
    latitude: string,
    longitude: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListLocationssQueryVariables = {
  filter?: ModelLocationsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListLocationssQuery = {
  listLocationss?:  {
    __typename: "ModelLocationsConnection",
    items?:  Array< {
      __typename: "Locations",
      id: string,
      timestamp: number,
      latitude: string,
      longitude: string,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type OnCreateLocationsSubscription = {
  onCreateLocations?:  {
    __typename: "Locations",
    id: string,
    timestamp: number,
    latitude: string,
    longitude: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateLocationsSubscription = {
  onUpdateLocations?:  {
    __typename: "Locations",
    id: string,
    timestamp: number,
    latitude: string,
    longitude: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteLocationsSubscription = {
  onDeleteLocations?:  {
    __typename: "Locations",
    id: string,
    timestamp: number,
    latitude: string,
    longitude: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};
