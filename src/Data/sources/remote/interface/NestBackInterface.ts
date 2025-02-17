export interface BackendUser{
  uid : number
  email : string
  emailVerified : boolean
  displayName : string
  disabled : boolean
  metadata : Metadata
  tokensValidAfterTime : string
  providerData : ProviderDatum[]
}

export interface Metadata{
  lastSignInTime : null
  creationTime : string
  lastRefreshTime : null
}

export interface ProviderDatum{
  uid : string
  displayName : string
  email : string
  providerId : string
}