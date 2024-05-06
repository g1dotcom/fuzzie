import React from "react";

type Props = {};

const ProfilePicture = (props: Props) => {
  return (
    <div className="flex flex-col">
      <p className="text-lg text-white">Profile Picture</p>
      <div className="Flex h-[30vh] flex-col items-center justify-center"></div>
    </div>
  );
};

export default ProfilePicture;
