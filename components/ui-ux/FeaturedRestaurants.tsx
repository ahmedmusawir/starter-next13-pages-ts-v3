import React from "react";

const posts = [
  {
    id: 1,
    title: "The Empty Plate",
    href: "#",
    description:
      "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.",
    imageUrl:
      "https://res.cloudinary.com/dyb0qa58h/image/upload/v1693550891/28901207_poqw6f.webp",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
  },
  {
    id: 2,
    title: "Bulimic Pleasures",
    href: "#",
    description:
      "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.",
    imageUrl:
      "https://res.cloudinary.com/dyb0qa58h/image/upload/v1693553673/49981990_xtn8kc.webp",
    // "https://res.cloudinary.com/dyb0qa58h/image/upload/v1693550556/54337931_p834um.webp",

    date: "Mar 16, 2020",
    datetime: "2020-03-16",
  },
  {
    id: 3,
    title: "The Fat Woman",
    href: "#",
    description:
      "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.",
    imageUrl:
      "https://res.cloudinary.com/dyb0qa58h/image/upload/v1693549848/54337941_wkvl98.webp",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
  },
];

const FeaturedRestaurants = () => {
  return (
    <div className="bg-white pt-1 pb-12 sm:pt-1 sm:pb-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          {/* <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"> */}
          <h2 className="text-3xl font-bold tracking-tight text-indigo-600 sm:text-4xl">
            Featured Restaurants
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            The top restaurants of the peach state Georgia
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3 mb-10">
          {posts.map((post) => (
            <article
              key={post.id}
              className="flex flex-col items-start justify-between"
            >
              <div className="relative w-full">
                <img
                  src={post.imageUrl}
                  alt=""
                  className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
              </div>
              <div className="max-w-xl">
                <div className="mt-8 flex items-center gap-x-4 text-xs">
                  <a
                    href="#"
                    className="relative z-10 rounded-full bg-purple-100 px-3 py-1.5 font-medium text-gray-800 hover:bg-gray-100"
                  >
                    Fine Dining
                  </a>
                  <a
                    href="#"
                    className="relative z-10 rounded-full bg-purple-100 px-3 py-1.5 font-medium text-gray-800 hover:bg-gray-100"
                  >
                    Bar / Lounge
                  </a>
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    <a href={post.href}>
                      <span className="absolute inset-0" />
                      {post.title}
                    </a>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                    {post.description}
                  </p>
                </div>
                <div className="relative mt-8 flex items-center gap-x-4">
                  <button
                    type="button"
                    className="rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
        <hr className="mb-8" />
        <div className="mx-auto max-w-2xl text-center">
          <button
            type="button"
            className="rounded-full bg-red-700 px-10 py-4 text-sm font-semibold text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Show All
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedRestaurants;
