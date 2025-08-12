function UserProfile() {
  return (
    <div className="bg-gray-100 
                   p-4 md:p-8 
                   max-w-xs md:max-w-sm 
                   mx-auto 
                   my-4 md:my-20 
                   rounded-lg 
                   shadow-lg
                   transition-all 
                   duration-300
                   hover:shadow-xl
                   hover:-translate-y-1
                   group">
      <img 
        src="https://via.placeholder.com/150" 
        alt="User" 
        className="rounded-full 
                  w-24 h-24 md:w-36 md:h-36 
                  mx-auto
                  border-4 border-white
                  shadow-md
                  transition-transform 
                  duration-500 
                  ease-in-out
                  hover:scale-110
                  hover:shadow-lg
                  group-hover:border-blue-200"
      />
      <h1 className="text-lg md:text-xl 
                    text-blue-800 
                    my-4
                    transition-colors
                    duration-300
                    hover:text-blue-500
                    cursor-pointer">
        John Doe
      </h1>
      <p className="text-sm md:text-base 
                  text-gray-600
                  transition-all
                  duration-500
                  group-hover:text-gray-800">
        Developer at Example Co. Loves to write code and explore new technologies.
      </p>
    </div>
  );
}

export default UserProfile;
