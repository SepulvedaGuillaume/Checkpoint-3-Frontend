import { gql } from "@apollo/client";

export const GET_COUNTRIES = gql`
  query Countries {
    countries {
      id
      code
      name
      emoji
      continent {
        id
        name
      }
    }
  }
`;

export const GET_COUNTRY = gql`
  query Country($code: String!) {
    country(code: $code) {
      id
      code
      name
      emoji
      continent {
        id
        name
      }
    }
  }
`;

export const GET_CONTINENTS = gql`
  query Continents {
    continents {
      id
      name
    }
  }
`;

export const ADD_CONTINENT = gql`
  mutation AddContinent($data: NewContinentInput!) {
    addContinent(data: $data) {
      id
      name
    }
  }
`;

export const ADD_COUNTRY = gql`
  mutation AddCountry($data: NewCountryInput!) {
    addCountry(data: $data) {
      id
      code
      name
      emoji
      continent {
        id
        name
      }
    }
  }
`;
