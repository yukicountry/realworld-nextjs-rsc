import { User } from "@/utils/types/models";

export const showEditProfileSettingsButton = (profileUsername: string, currentUser: User | undefined) => {
  if (currentUser == null) {
    return false;
  }

  return profileUsername === currentUser.username;
};
