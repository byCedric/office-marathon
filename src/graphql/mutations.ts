/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createLocations = /* GraphQL */ `
  mutation CreateLocations(
    $input: CreateLocationsInput!
    $condition: ModelLocationsConditionInput
  ) {
    createLocations(input: $input, condition: $condition) {
      id
      timestamp
      latitude
      longitude
      createdAt
      updatedAt
    }
  }
`;
export const updateLocations = /* GraphQL */ `
  mutation UpdateLocations(
    $input: UpdateLocationsInput!
    $condition: ModelLocationsConditionInput
  ) {
    updateLocations(input: $input, condition: $condition) {
      id
      timestamp
      latitude
      longitude
      createdAt
      updatedAt
    }
  }
`;
export const deleteLocations = /* GraphQL */ `
  mutation DeleteLocations(
    $input: DeleteLocationsInput!
    $condition: ModelLocationsConditionInput
  ) {
    deleteLocations(input: $input, condition: $condition) {
      id
      timestamp
      latitude
      longitude
      createdAt
      updatedAt
    }
  }
`;
