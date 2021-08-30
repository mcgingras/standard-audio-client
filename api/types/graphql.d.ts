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
  createSong: Song;
  createTape: Tape;
  deleteSong: Song;
  deleteTape: Tape;
  updateSong: Song;
  updateTape: Tape;
  updateTapeWithExistingSongs?: Maybe<Tape>;
  updateTapeWithSongs: Tape;
};


export type MutationCreateSongArgs = {
  input: CreateSongInput;
};


export type MutationCreateTapeArgs = {
  input: CreateTapeInput;
};


export type MutationDeleteSongArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteTapeArgs = {
  id: Scalars['Int'];
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
  redwood?: Maybe<Redwood>;
  song?: Maybe<Song>;
  songs: Array<Song>;
  tape?: Maybe<Tape>;
  tapes: Array<Tape>;
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
  SongsOnTapes: Array<Maybe<SongsOnTapes>>;
  ipfsHash: Scalars['String'];
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
  CreateSongInput: CreateSongInput;
  String: ResolverTypeWrapper<Scalars['String']>;
  CreateTapeInput: CreateTapeInput;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  JSON: ResolverTypeWrapper<Scalars['JSON']>;
  JSONObject: ResolverTypeWrapper<Scalars['JSONObject']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  Redwood: ResolverTypeWrapper<Redwood>;
  Song: ResolverTypeWrapper<Song>;
  SongInput: SongInput;
  SongsOnTapes: ResolverTypeWrapper<SongsOnTapes>;
  SongsOnTapesInput: SongsOnTapesInput;
  Tape: ResolverTypeWrapper<Tape>;
  Time: ResolverTypeWrapper<Scalars['Time']>;
  UpdateSongInput: UpdateSongInput;
  UpdateTapeInput: UpdateTapeInput;
  UpdateTapeWithSongsInput: UpdateTapeWithSongsInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  CreateSongInput: CreateSongInput;
  String: Scalars['String'];
  CreateTapeInput: CreateTapeInput;
  Int: Scalars['Int'];
  Float: Scalars['Float'];
  Boolean: Scalars['Boolean'];
  Date: Scalars['Date'];
  DateTime: Scalars['DateTime'];
  JSON: Scalars['JSON'];
  JSONObject: Scalars['JSONObject'];
  Mutation: {};
  Query: {};
  Redwood: Redwood;
  Song: Song;
  SongInput: SongInput;
  SongsOnTapes: SongsOnTapes;
  SongsOnTapesInput: SongsOnTapesInput;
  Tape: Tape;
  Time: Scalars['Time'];
  UpdateSongInput: UpdateSongInput;
  UpdateTapeInput: UpdateTapeInput;
  UpdateTapeWithSongsInput: UpdateTapeWithSongsInput;
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
  createSong?: Resolver<ResolversTypes['Song'], ParentType, ContextType, RequireFields<MutationCreateSongArgs, 'input'>>;
  createTape?: Resolver<ResolversTypes['Tape'], ParentType, ContextType, RequireFields<MutationCreateTapeArgs, 'input'>>;
  deleteSong?: Resolver<ResolversTypes['Song'], ParentType, ContextType, RequireFields<MutationDeleteSongArgs, 'id'>>;
  deleteTape?: Resolver<ResolversTypes['Tape'], ParentType, ContextType, RequireFields<MutationDeleteTapeArgs, 'id'>>;
  updateSong?: Resolver<ResolversTypes['Song'], ParentType, ContextType, RequireFields<MutationUpdateSongArgs, 'id' | 'input'>>;
  updateTape?: Resolver<ResolversTypes['Tape'], ParentType, ContextType, RequireFields<MutationUpdateTapeArgs, 'id' | 'input'>>;
  updateTapeWithExistingSongs?: Resolver<Maybe<ResolversTypes['Tape']>, ParentType, ContextType, RequireFields<MutationUpdateTapeWithExistingSongsArgs, 'id' | 'input'>>;
  updateTapeWithSongs?: Resolver<ResolversTypes['Tape'], ParentType, ContextType, RequireFields<MutationUpdateTapeWithSongsArgs, 'id' | 'input'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  redwood?: Resolver<Maybe<ResolversTypes['Redwood']>, ParentType, ContextType>;
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
  SongsOnTapes?: Resolver<Array<Maybe<ResolversTypes['SongsOnTapes']>>, ParentType, ContextType>;
  ipfsHash?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface TimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Time'], any> {
  name: 'Time';
}

export type Resolvers<ContextType = any> = {
  Date?: GraphQLScalarType;
  DateTime?: GraphQLScalarType;
  JSON?: GraphQLScalarType;
  JSONObject?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Redwood?: RedwoodResolvers<ContextType>;
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
