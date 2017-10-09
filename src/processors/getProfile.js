// @flow

type TSocialProfile = {
  name: string,
  email: string,
  avatar: string,
}

export function parseGoogleProfile(profile: any): TSocialProfile {
  return {
    email: profile.email,
    name: profile.name,
    avatar: profile.picture,
  }
}

export function parseFacebookProfile(profile: any): TSocialProfile {
  return {
    email: profile.email,
    name: profile.name,
    avatar: profile.picture,
  }
}

export function getProfile({
  network,
  profile,
}: {
  network: string,
  profile: any,
}): TSocialProfile {
  const fn = {
    facebook: parseFacebookProfile,
    google: parseGoogleProfile,
  }[network]
  return fn(profile)
}
