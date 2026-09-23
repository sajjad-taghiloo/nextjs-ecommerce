export default function ContactPage() {
  return (
    <main className="bg-[#080808] text-white">

      {/* Hero */}
      <section className="relative min-h-[75vh] overflow-hidden border-b border-white/10">

        <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#C9A227]/10 blur-[120px]" />

        <div className="relative mx-auto flex min-h-[75vh] max-w-6xl items-center px-6 py-24">

          <div className="max-w-3xl">

            <div className="mb-8 flex items-center gap-3">

              <span className="h-px w-10 bg-[#C9A227]" />

              <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#C9A227]">
                Contact
              </p>

            </div>


            <h1 className="text-4xl font-medium leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">

              Let&apos;s talk about
              <br />

              <span className="text-zinc-500">
                what you&apos;re building.
              </span>

            </h1>


            <p className="mt-8 max-w-2xl text-base leading-8 text-zinc-400 sm:text-lg">
              Have a question, a project or simply an idea you want to discuss?
              Send us a message and let&apos;s start a conversation.
            </p>

          </div>

        </div>

      </section>


      {/* Contact Section */}
      <section className="min-h-[100vh] border-b border-white/10">

        <div className="mx-auto grid max-w-6xl gap-20 px-6 py-32 lg:grid-cols-[0.75fr_1.25fr] lg:gap-32">

          {/* Contact Information */}
          <div>

            <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#C9A227]">
              Get in touch
            </p>


            <h2 className="mt-8 text-3xl font-medium leading-tight tracking-tight sm:text-4xl">

              We&apos;d love to
              <br />

              <span className="text-zinc-500">
                hear from you.
              </span>

            </h2>


            <p className="mt-8 text-base leading-8 text-zinc-400">
              Whether you are interested in working together or simply have a
              question, feel free to reach out.
            </p>


            <div className="mt-16 space-y-12">

              <div>

                <p className="text-xs uppercase tracking-[0.18em] text-zinc-600">
                  Email
                </p>

                <a
                  href="mailto:hello@example.com"
                  className="mt-3 block text-sm text-zinc-300 transition hover:text-[#C9A227]"
                >
                  hello@example.com
                </a>

              </div>


              <div>

                <p className="text-xs uppercase tracking-[0.18em] text-zinc-600">
                  Phone
                </p>

                <a
                  href="tel:+1234567890"
                  className="mt-3 block text-sm text-zinc-300 transition hover:text-[#C9A227]"
                >
                  +1 234 567 890
                </a>

              </div>


              <div>

                <p className="text-xs uppercase tracking-[0.18em] text-zinc-600">
                  Office
                </p>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  125 Market Street
                  <br />
                  San Francisco, CA
                </p>

              </div>

            </div>

          </div>


          {/* Form */}
          <div>

            <form className="space-y-10">


              {/* Name + Email */}
              <div className="grid gap-10 sm:grid-cols-2">

                <div>

                  <label
                    htmlFor="name"
                    className="mb-3 block text-sm font-medium text-zinc-300"
                  >
                    Name
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your name"
                    className="w-full border-b border-zinc-700 bg-transparent px-0 py-4 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-[#C9A227]"
                  />

                </div>


                <div>

                  <label
                    htmlFor="email"
                    className="mb-3 block text-sm font-medium text-zinc-300"
                  >
                    Email
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    className="w-full border-b border-zinc-700 bg-transparent px-0 py-4 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-[#C9A227]"
                  />

                </div>

              </div>


              {/* Subject */}
              <div>

                <label
                  htmlFor="subject"
                  className="mb-3 block text-sm font-medium text-zinc-300"
                >
                  Subject
                </label>

                <input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="What can we help with?"
                  className="w-full border-b border-zinc-700 bg-transparent px-0 py-4 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-[#C9A227]"
                />

              </div>


              {/* Message */}
              <div>

                <label
                  htmlFor="message"
                  className="mb-3 block text-sm font-medium text-zinc-300"
                >
                  Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  rows="7"
                  placeholder="Tell us about your project..."
                  className="w-full resize-none border-b border-zinc-700 bg-transparent px-0 py-4 text-sm leading-7 text-white outline-none transition placeholder:text-zinc-600 focus:border-[#C9A227]"
                />

              </div>


              {/* Submit */}
              <button
                type="submit"
                className="group inline-flex items-center border-b border-[#C9A227] pb-2 text-sm font-medium text-[#C9A227] transition hover:text-white"
              >

                Send message

                <span className="ml-5 transition-transform group-hover:translate-x-1">
                  →
                </span>

              </button>

            </form>

          </div>

        </div>

      </section>


      {/* Email CTA */}
      <section className="min-h-[50vh] bg-[#0D0D0D]">

        <div className="mx-auto flex min-h-[50vh] max-w-6xl flex-col justify-center px-6 py-24">

          <p className="text-xs uppercase tracking-[0.22em] text-zinc-600">
            Prefer email?
          </p>

          <a
            href="mailto:hello@example.com"
            className="mt-6 w-fit text-2xl font-medium tracking-tight text-white transition hover:text-[#C9A227] sm:text-3xl"
          >
            hello@example.com
          </a>

        </div>

      </section>

    </main>
  );
}