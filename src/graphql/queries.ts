/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getLocations = /* GraphQL */ `
  query GetLocations($id: ID!) {
    getLocations(id: $id) {
      id
      timestamp
      latitude
      longitude
      createdAt
      updatedAt
    }
  }
`;
export const listLocationss = /* GraphQL */ `
  query ListLocationss(
    $filter: ModelLocationsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLocationss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        timestamp
        latitude
        longitude
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
