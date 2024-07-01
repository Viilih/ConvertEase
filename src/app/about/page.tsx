"use client";

export default function About() {
  return (
    <div className="text-white p-6">
      <h2 className="text-4xl font-bold mb-6">About ConvertEase</h2>
      <p className="mb-8 text-lg">
        ConvertEase started as a side project by a frontend developer (me :P)
        who was looking for interesting ideas to build.
        <strong> THEN SUDDENLY</strong>, I remembered the countless times I
        searched for file converters online, only to find that most of them
        required payment after a limited number of uses. That's when I decided
        to create my own solution.
      </p>
      <h3 className="text-3xl font-semibold mb-4">Disclaimers</h3>
      <p className="mb-8 text-lg">
        Please note that the speed of converting videos may not be as fast as
        professional, paid services, since this is a free tool and does not use
        any cloud services. However, ConvertEase is designed to provide a free
        and reliable alternative for your file conversion needs.
      </p>
      <h3 className="text-3xl font-semibold mb-4">Contribute</h3>
      <p className="text-lg">
        If you have some cool ideas and want to improve ConvertEase, feel free
        to open an issue on the repository and make a pull request.
        Contributions are welcome!
      </p>
    </div>
  );
}
