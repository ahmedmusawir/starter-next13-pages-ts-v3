import { useAuth } from "@/contexts/AuthContext";
import { UserCircleIcon } from "@heroicons/react/20/solid";

const UserProfileHeader = () => {
  const { user } = useAuth();

  return (
    <>
      <div className="flex flex-wrap justify-center">
        <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
          <div className="w-32 h-32 overflow-hidden rounded-full bg-gray-200 -mt-16">
            {user?.profileImage?.url ? (
              <img
                alt="User Profile"
                src={`http://localhost:1337${user.profileImage.url}`}
                className="w-full h-full object-cover shadow-xl"
              />
            ) : (
              <UserCircleIcon />
            )}
          </div>
        </div>
        <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
          <div className="py-6 px-3 mt-32 sm:mt-0">
            <button
              className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
              type="button"
            >
              Connect
            </button>
          </div>
        </div>
        <div className="w-full lg:w-4/12 px-4 lg:order-1">
          <div className="flex justify-center py-4 lg:pt-4 pt-8">
            <div className="mr-4 p-3 text-center">
              <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                22
              </span>
              <span className="text-sm text-blueGray-400">Friends</span>
            </div>
            <div className="mr-4 p-3 text-center">
              <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                10
              </span>
              <span className="text-sm text-blueGray-400">Photos</span>
            </div>
            <div className="lg:mr-4 p-3 text-center">
              <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                89
              </span>
              <span className="text-sm text-blueGray-400">Comments</span>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center mt-5">
        <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 capitalize">
          {user?.username}
        </h3>
        <p>{user?.email}</p>
        <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
          <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
          Los Angeles, California
        </div>
        <div className="mb-2 text-blueGray-600 mt-10">
          <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
          Solution Manager - Creative Team Officer
        </div>
        <div className="mb-2 text-blueGray-600">
          <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
          University of CyberizeGroup
        </div>
      </div>
    </>
  );
};

export default UserProfileHeader;
