import { axiosReq } from "../api/axiosDefaults"

export const fetchMoreData = async (resource, setResource) => {
    try {
        const {data} = await axiosReq.get(resource.next)
        setResource((prevResource) => ({
            ...prevResource,
            next: data.next,
            results: data.results.reduce((acc, cur) => {
                return acc.some((accResult) => accResult.id === cur.id)
                 ? acc
                 : [...acc, cur]
            }, prevResource.results),
        }));
    } catch (err) {
    }
};

export const followHelper = (profile, clickedProfile, following_id) => {
    return profile.id === clickedProfile.id ? {
        // this is the clicked on profile, updates its followers count and sets following id
        ...profile,
        followers_count: profile.followers_count + 1,
        following_id,
    }
    : profile.is_owner ? {
        // profile of the logged in user, updates its following count
        ...profile, following_count: profile.following_count + 1
    } :
        // this is not the clicked on profile so it will just return the profile unchanged
        profile;
}

export const unfollowHelper = (profile, clickedProfile) => {
    return profile.id === clickedProfile.id
      ? {
          ...profile,
          followers_count: profile.followers_count - 1,
          following_id: null,
        }
      : profile.is_owner
      ? { ...profile, following_count: profile.following_count - 1 }
      : profile;
  }