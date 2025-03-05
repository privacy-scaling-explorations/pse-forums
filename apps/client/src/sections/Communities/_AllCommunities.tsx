import { Avatar } from "@/components/Avatar";
import { Card } from "@/components/cards/Card";
import { Link } from "@tanstack/react-router";
import { membershipMocks } from "mocks/membershipMocks";

export const AllCommunities = () => {
  return (
    <div className="flex flex-col gap-4">
      {membershipMocks?.map((community) => (
        <Link key={community.id} to={`/communities/${community.id}`}>
          <Card.Base key={community.id} withHover>
            <div className="flex gap-3 items-center">
              <Avatar className="!size-[50px]" src={community.logo} />
              <div className="flex flex-col">
                <h3 className="text-base lg:text-lg font-semibold text-black font-inter">
                  {community.name}
                </h3>
                <span className=" text-black-secondary text-xs font-medium line-clamp-1">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
                  aperiam vero dolores, sunt consequuntur in laborum fugit!
                  Molestias, expedita quaerat?
                </span>
              </div>
            </div>
          </Card.Base>
        </Link>
      ))}
    </div>
  );
};
