import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="bg-[#080808] text-white">

      {/* Hero */}
      <section className="relative min-h-[82vh] overflow-hidden border-b border-white/10">

        {/* Gold glow */}
        <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#C9A227]/10 blur-[120px]" />

        <div className="relative mx-auto flex min-h-[82vh] max-w-6xl items-center px-6 py-24">

          <div className="max-w-3xl">

            <div className="mb-8 flex items-center gap-3">
              <span className="h-px w-10 bg-[#C9A227]" />

              <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#C9A227]">
                About us
              </p>
            </div>

            <h1 className="text-4xl font-medium leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Building digital
              <br />
              experiences with
              <span className="text-[#C9A227]"> purpose.</span>
            </h1>

            <p className="mt-8 max-w-2xl text-base leading-8 text-zinc-400 sm:text-lg">
              We combine thoughtful design, modern technology and careful
              engineering to build digital experiences that are simple,
              reliable and meaningful.
            </p>

          </div>

        </div>

      </section>


      {/* Story */}
      <section className="min-h-[90vh] border-b border-white/10">

        <div className="mx-auto grid max-w-6xl gap-20 px-6 py-32 lg:grid-cols-[0.8fr_1.2fr] lg:gap-32">

          <div>
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#C9A227]">
              01 — Our story
            </p>
          </div>

          <div>

            <h2 className="text-3xl font-medium leading-tight tracking-tight text-white sm:text-4xl">
              Technology should be
              <span className="text-zinc-500"> powerful.</span>
              <br />
              But it should also be
              <span className="text-[#C9A227]"> simple.</span>
            </h2>

            <div className="mt-12 space-y-7 text-base leading-8 text-zinc-400">

              <p>
                We started with a simple idea: the best digital products are
                not necessarily the ones with the most features. They are the
                ones that solve the right problems.
              </p>

              <p>
                Our approach combines design, technology and strategy to create
                products that are easy to understand and enjoyable to use.
              </p>

              <p>
                Every decision matters. From the architecture behind a
                product to the smallest interaction on the screen.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* Philosophy */}
      <section className="min-h-[90vh] border-b border-white/10 bg-[#0D0D0D]">

        <div className="mx-auto max-w-6xl px-6 py-32">

          <div className="max-w-2xl">

            <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#C9A227]">
              02 — Philosophy
            </p>

            <h2 className="mt-8 text-3xl font-medium leading-tight tracking-tight text-white sm:text-4xl">
              Less noise.
              <br />
              <span className="text-zinc-500">More substance.</span>
            </h2>

            <p className="mt-8 text-base leading-8 text-zinc-400">
              We believe good design is not about adding more. It is about
              removing what is unnecessary and focusing attention on what
              matters.
            </p>

          </div>


          <div className="mt-24 grid border-t border-white/10 md:grid-cols-3">

            <div className="border-b border-white/10 py-12 md:border-b-0 md:border-r md:pr-10">

              <span className="text-sm text-[#C9A227]">
                01
              </span>

              <h3 className="mt-8 text-xl font-medium text-white">
                Clarity
              </h3>

              <p className="mt-5 text-sm leading-7 text-zinc-500">
                Clear interfaces, clear communication and solutions that make
                sense.
              </p>

            </div>


            <div className="border-b border-white/10 py-12 md:border-b-0 md:border-r md:px-10">

              <span className="text-sm text-[#C9A227]">
                02
              </span>

              <h3 className="mt-8 text-xl font-medium text-white">
                Craft
              </h3>

              <p className="mt-5 text-sm leading-7 text-zinc-500">
                We care about the details because small decisions shape the
                entire experience.
              </p>

            </div>


            <div className="py-12 md:pl-10">

              <span className="text-sm text-[#C9A227]">
                03
              </span>

              <h3 className="mt-8 text-xl font-medium text-white">
                Progress
              </h3>

              <p className="mt-5 text-sm leading-7 text-zinc-500">
                We continuously learn, experiment and improve the way we build.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* Numbers */}
      <section className="min-h-[70vh] border-b border-white/10">

        <div className="mx-auto max-w-6xl px-6 py-32">

          <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#C9A227]">
            03 — By the numbers
          </p>


          <div className="mt-24 grid gap-16 sm:grid-cols-2 lg:grid-cols-4">

            <div>
              <p className="text-4xl font-medium tracking-tight text-white">
                08<span className="text-[#C9A227]">+</span>
              </p>

              <p className="mt-4 text-sm text-zinc-500">
                Years of experience
              </p>
            </div>


            <div>
              <p className="text-4xl font-medium tracking-tight text-white">
                120<span className="text-[#C9A227]">+</span>
              </p>

              <p className="mt-4 text-sm text-zinc-500">
                Projects completed
              </p>
            </div>


            <div>
              <p className="text-4xl font-medium tracking-tight text-white">
                35<span className="text-[#C9A227]">+</span>
              </p>

              <p className="mt-4 text-sm text-zinc-500">
                Clients worldwide
              </p>
            </div>


            <div>
              <p className="text-4xl font-medium tracking-tight text-white">
                24<span className="text-[#C9A227]">/7</span>
              </p>

              <p className="mt-4 text-sm text-zinc-500">
                Support
              </p>
            </div>

          </div>

        </div>

      </section>


      {/* CTA */}
      <section className="relative min-h-[60vh] overflow-hidden bg-[#C9A227] text-black">

        <div className="mx-auto flex min-h-[60vh] max-w-6xl flex-col justify-center px-6 py-24">

          <p className="text-xs font-bold uppercase tracking-[0.25em] text-black/60">
            What&apos;s next?
          </p>

          <h2 className="mt-7 max-w-2xl text-4xl font-medium tracking-tight sm:text-5xl">
            Have a project
            <br />
            in mind?
          </h2>

          <p className="mt-7 max-w-xl text-base leading-8 text-black/60">
            Tell us what you are working on and let&apos;s see how we can
            turn the idea into something meaningful.
          </p>

          <div className="mt-10">

            <Link
              href="/contactus"
              className="group inline-flex items-center border-b border-black pb-2 text-sm font-semibold"
            >
              Get in touch

              <span className="ml-5 transition-transform group-hover:translate-x-1">
                →
              </span>

            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}