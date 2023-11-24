/* eslint-disable react/no-unescaped-entities */
const Faq = () => {
  return (
    <div className="container mx-auto text-center text-lime-500">
      <div className="collapse collapse-arrow bg-base-200">
        <input type="radio" name="my-accordion-2" defaultChecked />
        <div className="collapse-title text-xl font-medium my-5">
          Question: How long does it typically take to repair my electronic
          device?
        </div>
        <div className="collapse-content">
          <p>
            Answer: The repair time can vary depending on the complexity of the
            issue and the availability of replacement parts. In many cases, we
            aim to provide same-day or next-day repairs for common problems like
            screen replacements or battery replacements. However, for more
            complex issues, it may take a few days to a week. Our technicians
            will assess your device and provide you with a more accurate
            estimate once they've diagnosed the problem.
          </p>
        </div>
      </div>
      <div className="collapse collapse-arrow bg-base-200">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title text-xl font-medium my-5">
          Question: Do you offer a warranty on your electronic repairs?
        </div>
        <div className="collapse-content">
          <p>
            Answer: Yes, we stand by the quality of our repairs. We offer a
            warranty on our repair services, typically covering the parts and
            labor for the repaired issue. The duration of the warranty may vary
            depending on the specific repair, but it's usually 90 days. If you
            experience any issues related to the repair within the warranty
            period, just bring your device back to us, and we'll address it at
            no additional cost
          </p>
        </div>
      </div>
      <div className="collapse collapse-arrow bg-base-200">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title text-xl font-medium my-5">
          Question: Can you repair all types of electronic devices, or are there
          limitations?
        </div>
        <div className="collapse-content">
          <p>
            Answer: We specialize in repairing a wide range of electronic
            devices, including smartphones, tablets, laptops, desktop computers,
            gaming consoles, and more. However, there may be limitations when it
            comes to extremely outdated or rare devices for which replacement
            parts are no longer available. Before committing to a repair, we'll
            assess your device and provide you with a clear understanding of the
            feasibility of the repair and the estimated cost. If we can't repair
            your device, we can often offer advice on alternative solutions or
            replacements.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Faq;
