import React from "react";
import { renderSocialIcon } from "../../profile/utils/icons";

export interface Profile {
  username: string;
  bio: string;
  socialLinks: string[];
}

interface ProfileCardProps {
  profile: Profile;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
  return (
    <div className="bg-[#1b1c1d] rounded-xl p-6">
      <div className="flex flex-col items-center mb-4">
        <div className="relative mb-2 -ml-4">
          <img
            src="data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2280%22%20height%3D%2280%22%20viewBox%3D%220%200%2080%2080%22%3E%3Crect%20width%3D%2280%22%20height%3D%2280%22%20fill%3D%22%23ff0066%22/%3E%3Ctext%20x%3D%2240%22%20y%3D%2240%22%20font-family%3D%22Arial%22%20font-size%3D%2220%22%20fill%3D%22%23fff%22%20text-anchor%3D%22middle%22%20alignment-baseline%3D%22middle%22%3E😎%3C/text%3E%3C/svg%3E"
            alt={`${profile.username} profile`}
            className="w-16 h-16 rounded-lg bg-pink-600"
          />
        </div>
        <span className="flex">
          <h2 className="text-xl font-bold mr-2">{profile.username}</h2>
          <button className="text-blue-400 flex items-center mt-1">
            <svg
              className="w-4 h-4 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </span>
      </div>
      <p className="text-sm text-gray-400 text-center mb-4">{profile.bio}</p>
      <div className="flex justify-center gap-2">
        {profile.socialLinks.map((social, index) => (
          <button key={index} className="p-3 bg-gray-800 rounded-full">
            {renderSocialIcon(social)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProfileCard;
