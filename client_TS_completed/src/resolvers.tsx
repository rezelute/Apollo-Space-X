import gql from "graphql-tag";
import { ApolloCache } from "apollo-cache";
import { Resolvers } from "apollo-client";
import { GET_CART_ITEMS } from "./pages/cart";
import * as GetCartItemTypes from "./pages/__generated__/GetCartItems";
import * as LaunchTileTypes from "./pages/__generated__/LaunchTile";

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
    cartItems: [ID!]!
  }

  extend type Launch {
    isInCart: Boolean!
  }

  extend type Mutation {
    addOrRemoveFromCart(id: ID!): [ID!]!
  }
`;

export const schema = gql`
  extend type Launch {
    isInCart: Boolean!
  }
`;

type ResolverFn = (
  parent: any,
  args: any,
  { cache }: { cache: ApolloCache<any> }
) => any;

interface ResolverMap {
  [field: string]: ResolverFn;
}

interface AppResolvers extends Resolvers {
  // We will update this with our app's resolvers later
  Launch: ResolverMap;
  Mutation: ResolverMap;
}

export const resolvers: AppResolvers = {
  Mutation: {
    addOrRemoveFromCart: (_, { id }: { id: string }, { cache }): string[] => {
      const queryResult = cache.readQuery<GetCartItemTypes.GetCartItems, any>({
        query: GET_CART_ITEMS
      });
      if (queryResult) {
        const { cartItems } = queryResult;
        const data = {
          cartItems: cartItems.includes(id)
            ? cartItems.filter(i => i !== id)
            : [...cartItems, id]
        };
        cache.writeQuery({ query: GET_CART_ITEMS, data });
        return data.cartItems;
      }
      return [];
    }
  },

  Launch: {
    isInCart: (launch: LaunchTileTypes.LaunchTile, _, { cache }): boolean => {
      const queryResult = cache.readQuery<GetCartItemTypes.GetCartItems>({
        query: GET_CART_ITEMS
      });
      if (queryResult) {
        return queryResult.cartItems.includes(launch.id);
      }
      return false;
    }
  }
};
