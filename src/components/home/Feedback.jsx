import { gradientTextClasses } from "../shared/GradientText";
import TypeWriterCustom from "../shared/TypeWriterCustom";

/* eslint-disable react/no-unescaped-entities */
const Feedback = () => {
  return (
    <div>
      <section className="text-neutral-700 dark:text-neutral-300">
        <div className="mx-auto text-center md:max-w-xl lg:max-w-3xl">
          <div>
            <TypeWriterCustom
              text={["Customer Feedback"]}
              size={3}
            ></TypeWriterCustom>
          </div>
          <p className="mb-6 pb-2 md:mb-12 md:pb-0 text-lime-500">
            At our electronic repair shop, we take pride in our work. But don't
            just take our word for it - hear from our satisfied customers!
          </p>
        </div>

        <div className="grid gap-6 text-center md:grid-cols-3">
          <div>
            <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-700 dark:shadow-black/30">
              <div className="h-28 overflow-hidden rounded-t-lg bg-[#9d789b]"></div>
              <div className="mx-auto -mt-12 w-24 overflow-hidden rounded-full border-2 border-white bg-white dark:border-neutral-800 dark:bg-neutral-800">
                <img
                  src="https://tecdn.b-cdn.net/img/Photos/Avatars/img%20(1).webp"
                  alt="Maria Smantha"
                />
              </div>
              <div className="p-6">
                <h4
                  className={`"mb-4 text-2xl font-semibold" ${gradientTextClasses}`}
                >
                  Maria Smantha
                </h4>
                <hr />
                <p className="mt-4 text-lime-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="inline-block h-7 w-7 pr-2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M13 14.725c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275zm-13 0c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275z" />
                  </svg>
                  I had an issue with my electronic device, and this shop
                  provided excellent service. They fixed it quickly and
                  efficiently. Highly recommended!
                </p>
              </div>
            </div>
          </div>

          <div>
            <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-700 dark:shadow-black/30">
              <div className="h-28 overflow-hidden rounded-t-lg bg-[#7a81a8]"></div>
              <div className="mx-auto -mt-12 w-24 overflow-hidden rounded-full border-2 border-white bg-white dark:border-neutral-800 dark:bg-neutral-800">
                <img
                  src="https://tecdn.b-cdn.net/img/Photos/Avatars/img%20(2).webp"
                  alt="Lisa Cudrow"
                />
              </div>
              <div className="p-6">
                <h4
                  className={`"mb-4 text-2xl font-semibold" ${gradientTextClasses}`}
                >
                  Lisa Cudrow
                </h4>
                <hr />
                <p className="mt-4 text-lime-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="inline-block h-7 w-7 pr-2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M13 14.725c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275zm-13 0c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275z" />
                  </svg>
                  My phone's screen was cracked, and this shop fixed it
                  perfectly. They are experts in electronic repairs. I'm a happy
                  customer!
                </p>
              </div>
            </div>
          </div>

          <div>
            <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-700 dark:shadow-black/30">
              <div className="h-28 overflow-hidden rounded-t-lg bg-[#6d5b98]"></div>
              <div className="mx-auto -mt-12 w-24 overflow-hidden rounded-full border-2 border-white bg-white dark:border-neutral-800 dark:bg-neutral-800">
                <img
                  src="https://tecdn.b-cdn.net/img/Photos/Avatars/img%20(9).webp"
                  alt="John Smith"
                />
              </div>
              <div className="p-6">
                <h4
                  className={`"mb-4 text-2xl font-semibold" ${gradientTextClasses}`}
                >
                  John Smith
                </h4>
                <hr />
                <p className="mt-4 text-lime-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="inline-block h-7 w-7 pr-2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M13 14.725c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275zm-13 0c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275z" />
                  </svg>
                  This repair shop is amazing. They fixed my electronic device
                  quickly and professionally. I'm extremely satisfied with their
                  service!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Feedback;
