import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: string;
  DateTime: string;
  JSON: Record<string, unknown>;
  JSONObject: Record<string, unknown>;
  Time: string;
};

export type Bid = {
  __typename?: 'Bid';
  id: Scalars['Int'];
  tape: Tape;
  tapeId: Scalars['Int'];
  bidder: Scalars['String'];
  amount: Scalars['Float'];
  active: Scalars['Boolean'];
};

export type CreateBidInput = {
  tapeId: Scalars['Int'];
  bidder: Scalars['String'];
  amount: Scalars['Float'];
  active: Scalars['Boolean'];
};

export type CreateSaleInput = {
  tapeId: Scalars['Int'];
  amount: Scalars['Int'];
  active: Scalars['Boolean'];
};

export type CreateSongInput = {
  name: Scalars['String'];
  artist: Scalars['String'];
  uri: Scalars['String'];
};

export type CreateTapeInput = {
  owner: Scalars['String'];
  name: Scalars['String'];
  capacity: Scalars['Int'];
  quality: Scalars['Int'];
  style: Scalars['Float'];
  proof: Array<Maybe<Scalars['String']>>;
  isClaimed: Scalars['Boolean'];
  claimLock: Scalars['Boolean'];
  ipfsHash: Scalars['String'];
};





export type Mutation = {
  __typename?: 'Mutation';
  createBid: Bid;
  createSale: Sale;
  createSong: Song;
  createTape: Tape;
  deleteBid: Bid;
  deleteSale: Sale;
  deleteSong: Song;
  deleteTape: Tape;
  updateBid: Bid;
  updateSale: Sale;
  updateSong: Song;
  updateTape: Tape;
  updateTapeWithExistingSongs?: Maybe<Tape>;
  updateTapeWithSongs: Tape;
};


export type MutationCreateBidArgs = {
  input: CreateBidInput;
};


export type MutationCreateSaleArgs = {
  input: CreateSaleInput;
};


export type MutationCreateSongArgs = {
  input: CreateSongInput;
};


export type MutationCreateTapeArgs = {
  input: CreateTapeInput;
};


export type MutationDeleteBidArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteSaleArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteSongArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteTapeArgs = {
  id: Scalars['Int'];
};


export type MutationUpdateBidArgs = {
  id: Scalars['Int'];
  input: UpdateBidInput;
};


export type MutationUpdateSaleArgs = {
  id: Scalars['Int'];
  input: UpdateSaleInput;
};


export type MutationUpdateSongArgs = {
  id: Scalars['Int'];
  input: UpdateSongInput;
};


export type MutationUpdateTapeArgs = {
  id: Scalars['Int'];
  input: UpdateTapeInput;
};


export type MutationUpdateTapeWithExistingSongsArgs = {
  id: Scalars['Int'];
  input: UpdateTapeWithSongsInput;
};


export type MutationUpdateTapeWithSongsArgs = {
  id: Scalars['Int'];
  input: UpdateTapeWithSongsInput;
};

export type Query = {
  __typename?: 'Query';
  bid?: Maybe<Bid>;
  bids: Array<Bid>;
  redwood?: Maybe<Redwood>;
  sale?: Maybe<Sale>;
  sales: Array<Sale>;
  song?: Maybe<Song>;
  songs: Array<Song>;
  tape?: Maybe<Tape>;
  tapes: Array<Tape>;
};


export type QueryBidArgs = {
  id: Scalars['Int'];
};


export type QuerySaleArgs = {
  id: Scalars['Int'];
};


export type QuerySongArgs = {
  id: Scalars['Int'];
};


export type QueryTapeArgs = {
  id: Scalars['Int'];
};


export type QueryTapesArgs = {
  isClaimed?: Maybe<Scalars['Boolean']>;
  owner?: Maybe<Scalars['String']>;
};

export type Redwood = {
  __typename?: 'Redwood';
  version?: Maybe<Scalars['String']>;
  currentUser?: Maybe<Scalars['JSON']>;
  prismaVersion?: Maybe<Scalars['String']>;
};

export type Sale = {
  __typename?: 'Sale';
  id: Scalars['Int'];
  tape: Tape;
  tapeId: Scalars['Int'];
  amount: Scalars['Int'];
  active: Scalars['Boolean'];
};

export type Song = {
  __typename?: 'Song';
  id: Scalars['Int'];
  name: Scalars['String'];
  artist: Scalars['String'];
  uri: Scalars['String'];
  SongsOnTapes: Array<Maybe<SongsOnTapes>>;
};

export type SongInput = {
  id?: Maybe<Scalars['Int']>;
  name: Scalars['String'];
  artist: Scalars['String'];
  uri: Scalars['String'];
};

export type SongsOnTapes = {
  __typename?: 'SongsOnTapes';
  id: Scalars['Int'];
  tapeId: Scalars['Int'];
  songId: Scalars['Int'];
  song?: Maybe<Song>;
  tape: Tape;
};

export type SongsOnTapesInput = {
  id: Scalars['Int'];
};

export type Tape = {
  __typename?: 'Tape';
  id: Scalars['Int'];
  owner: Scalars['String'];
  name: Scalars['String'];
  capacity: Scalars['Int'];
  quality: Scalars['Int'];
  style: Scalars['Float'];
  proof: Array<Maybe<Scalars['String']>>;
  isClaimed: Scalars['Boolean'];
  claimLock: Scalars['Boolean'];
  Bids?: Maybe<Array<Maybe<Bid>>>;
  SongsOnTapes: Array<Maybe<SongsOnTapes>>;
  SalePrice?: Maybe<Array<Maybe<Sale>>>;
  ipfsHash: Scalars['String'];
};


export type UpdateBidInput = {
  tapeId?: Maybe<Scalars['Int']>;
  bidder?: Maybe<Scalars['String']>;
  amount?: Maybe<Scalars['Float']>;
  active?: Maybe<Scalars['Boolean']>;
};

export type UpdateSaleInput = {
  tapeId?: Maybe<Scalars['Int']>;
  amount?: Maybe<Scalars['Int']>;
  active?: Maybe<Scalars['Boolean']>;
};

export type UpdateSongInput = {
  name?: Maybe<Scalars['String']>;
  artist?: Maybe<Scalars['String']>;
  uri?: Maybe<Scalars['String']>;
};

export type UpdateTapeInput = {
  owner?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  capacity?: Maybe<Scalars['Int']>;
  quality?: Maybe<Scalars['Int']>;
  style?: Maybe<Scalars['Float']>;
  proof?: Maybe<Array<Maybe<Scalars['String']>>>;
  isClaimed?: Maybe<Scalars['Boolean']>;
  claimLock?: Maybe<Scalars['Boolean']>;
  ipfsHash?: Maybe<Scalars['String']>;
};

export type UpdateTapeWithSongsInput = {
  owner?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  capacity?: Maybe<Scalars['Int']>;
  quality?: Maybe<Scalars['Int']>;
  style?: Maybe<Scalars['Float']>;
  proof?: Maybe<Array<Maybe<Scalars['String']>>>;
  isClaimed?: Maybe<Scalars['Boolean']>;
  claimLock?: Maybe<Scalars['Boolean']>;
  ipfsHash?: Maybe<Scalars['String']>;
  existingSongs?: Maybe<Array<Maybe<SongsOnTapesInput>>>;
  newSongs?: Maybe<Array<Maybe<SongInput>>>;
  SongsOnTapes?: Maybe<Array<Maybe<SongInput>>>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Bid: ResolverTypeWrapper<Bid>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  CreateBidInput: CreateBidInput;
  CreateSaleInput: CreateSaleInput;
  CreateSongInput: CreateSongInput;
  CreateTapeInput: CreateTapeInput;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  JSON: ResolverTypeWrapper<Scalars['JSON']>;
  JSONObject: ResolverTypeWrapper<Scalars['JSONObject']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  Redwood: ResolverTypeWrapper<Redwood>;
  Sale: ResolverTypeWrapper<Sale>;
  Song: ResolverTypeWrapper<Song>;
  SongInput: SongInput;
  SongsOnTapes: ResolverTypeWrapper<SongsOnTapes>;
  SongsOnTapesInput: SongsOnTapesInput;
  Tape: ResolverTypeWrapper<Tape>;
  Time: ResolverTypeWrapper<Scalars['Time']>;
  UpdateBidInput: UpdateBidInput;
  UpdateSaleInput: UpdateSaleInput;
  UpdateSongInput: UpdateSongInput;
  UpdateTapeInput: UpdateTapeInput;
  UpdateTapeWithSongsInput: UpdateTapeWithSongsInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Bid: Bid;
  Int: Scalars['Int'];
  String: Scalars['String'];
  Float: Scalars['Float'];
  Boolean: Scalars['Boolean'];
  CreateBidInput: CreateBidInput;
  CreateSaleInput: CreateSaleInput;
  CreateSongInput: CreateSongInput;
  CreateTapeInput: CreateTapeInput;
  Date: Scalars['Date'];
  DateTime: Scalars['DateTime'];
  JSON: Scalars['JSON'];
  JSONObject: Scalars['JSONObject'];
  Mutation: {};
  Query: {};
  Redwood: Redwood;
  Sale: Sale;
  Song: Song;
  SongInput: SongInput;
  SongsOnTapes: SongsOnTapes;
  SongsOnTapesInput: SongsOnTapesInput;
  Tape: Tape;
  Time: Scalars['Time'];
  UpdateBidInput: UpdateBidInput;
  UpdateSaleInput: UpdateSaleInput;
  UpdateSongInput: UpdateSongInput;
  UpdateTapeInput: UpdateTapeInput;
  UpdateTapeWithSongsInput: UpdateTapeWithSongsInput;
};

export type BidResolvers<ContextType = any, ParentType extends ResolversParentTypes['Bid'] = ResolversParentTypes['Bid']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  tape?: Resolver<ResolversTypes['Tape'], ParentType, ContextType>;
  tapeId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  bidder?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  active?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export interface JsonObjectScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSONObject'], any> {
  name: 'JSONObject';
}

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createBid?: Resolver<ResolversTypes['Bid'], ParentType, ContextType, RequireFields<MutationCreateBidArgs, 'input'>>;
  createSale?: Resolver<ResolversTypes['Sale'], ParentType, ContextType, RequireFields<MutationCreateSaleArgs, 'input'>>;
  createSong?: Resolver<ResolversTypes['Song'], ParentType, ContextType, RequireFields<MutationCreateSongArgs, 'input'>>;
  createTape?: Resolver<ResolversTypes['Tape'], ParentType, ContextType, RequireFields<MutationCreateTapeArgs, 'input'>>;
  deleteBid?: Resolver<ResolversTypes['Bid'], ParentType, ContextType, RequireFields<MutationDeleteBidArgs, 'id'>>;
  deleteSale?: Resolver<ResolversTypes['Sale'], ParentType, ContextType, RequireFields<MutationDeleteSaleArgs, 'id'>>;
  deleteSong?: Resolver<ResolversTypes['Song'], ParentType, ContextType, RequireFields<MutationDeleteSongArgs, 'id'>>;
  deleteTape?: Resolver<ResolversTypes['Tape'], ParentType, ContextType, RequireFields<MutationDeleteTapeArgs, 'id'>>;
  updateBid?: Resolver<ResolversTypes['Bid'], ParentType, ContextType, RequireFields<MutationUpdateBidArgs, 'id' | 'input'>>;
  updateSale?: Resolver<ResolversTypes['Sale'], ParentType, ContextType, RequireFields<MutationUpdateSaleArgs, 'id' | 'input'>>;
  updateSong?: Resolver<ResolversTypes['Song'], ParentType, ContextType, RequireFields<MutationUpdateSongArgs, 'id' | 'input'>>;
  updateTape?: Resolver<ResolversTypes['Tape'], ParentType, ContextType, RequireFields<MutationUpdateTapeArgs, 'id' | 'input'>>;
  updateTapeWithExistingSongs?: Resolver<Maybe<ResolversTypes['Tape']>, ParentType, ContextType, RequireFields<MutationUpdateTapeWithExistingSongsArgs, 'id' | 'input'>>;
  updateTapeWithSongs?: Resolver<ResolversTypes['Tape'], ParentType, ContextType, RequireFields<MutationUpdateTapeWithSongsArgs, 'id' | 'input'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  bid?: Resolver<Maybe<ResolversTypes['Bid']>, ParentType, ContextType, RequireFields<QueryBidArgs, 'id'>>;
  bids?: Resolver<Array<ResolversTypes['Bid']>, ParentType, ContextType>;
  redwood?: Resolver<Maybe<ResolversTypes['Redwood']>, ParentType, ContextType>;
  sale?: Resolver<Maybe<ResolversTypes['Sale']>, ParentType, ContextType, RequireFields<QuerySaleArgs, 'id'>>;
  sales?: Resolver<Array<ResolversTypes['Sale']>, ParentType, ContextType>;
  song?: Resolver<Maybe<ResolversTypes['Song']>, ParentType, ContextType, RequireFields<QuerySongArgs, 'id'>>;
  songs?: Resolver<Array<ResolversTypes['Song']>, ParentType, ContextType>;
  tape?: Resolver<Maybe<ResolversTypes['Tape']>, ParentType, ContextType, RequireFields<QueryTapeArgs, 'id'>>;
  tapes?: Resolver<Array<ResolversTypes['Tape']>, ParentType, ContextType, RequireFields<QueryTapesArgs, never>>;
};

export type RedwoodResolvers<ContextType = any, ParentType extends ResolversParentTypes['Redwood'] = ResolversParentTypes['Redwood']> = {
  version?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  currentUser?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  prismaVersion?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SaleResolvers<ContextType = any, ParentType extends ResolversParentTypes['Sale'] = ResolversParentTypes['Sale']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  tape?: Resolver<ResolversTypes['Tape'], ParentType, ContextType>;
  tapeId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  active?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SongResolvers<ContextType = any, ParentType extends ResolversParentTypes['Song'] = ResolversParentTypes['Song']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  artist?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  uri?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  SongsOnTapes?: Resolver<Array<Maybe<ResolversTypes['SongsOnTapes']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SongsOnTapesResolvers<ContextType = any, ParentType extends ResolversParentTypes['SongsOnTapes'] = ResolversParentTypes['SongsOnTapes']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  tapeId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  songId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  song?: Resolver<Maybe<ResolversTypes['Song']>, ParentType, ContextType>;
  tape?: Resolver<ResolversTypes['Tape'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TapeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Tape'] = ResolversParentTypes['Tape']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  capacity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  quality?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  style?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  proof?: Resolver<Array<Maybe<ResolversTypes['String']>>, ParentType, ContextType>;
  isClaimed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  claimLock?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  Bids?: Resolver<Maybe<Array<Maybe<ResolversTypes['Bid']>>>, ParentType, ContextType>;
  SongsOnTapes?: Resolver<Array<Maybe<ResolversTypes['SongsOnTapes']>>, ParentType, ContextType>;
  SalePrice?: Resolver<Maybe<Array<Maybe<ResolversTypes['Sale']>>>, ParentType, ContextType>;
  ipfsHash?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface TimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Time'], any> {
  name: 'Time';
}

export type Resolvers<ContextType = any> = {
  Bid?: BidResolvers<ContextType>;
  Date?: GraphQLScalarType;
  DateTime?: GraphQLScalarType;
  JSON?: GraphQLScalarType;
  JSONObject?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Redwood?: RedwoodResolvers<ContextType>;
  Sale?: SaleResolvers<ContextType>;
  Song?: SongResolvers<ContextType>;
  SongsOnTapes?: SongsOnTapesResolvers<ContextType>;
  Tape?: TapeResolvers<ContextType>;
  Time?: GraphQLScalarType;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
