import { NavLink } from "react-router-dom";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { RecentPlayedCard } from "@components/reusable/RecentPlayedCard";
import { VerticalCard } from "@components/reusable/VerticalCard";

export const Home = () => {
  const testPodcasts = [
    {
      title: "Grizzly Peaks Radio",
      subtitle: "Andy Goodman",
      coverSrc:
        "https://i.scdn.co/image/850f5a2b54854f56f4f3b01179b9ce84b32ef3b2",
    },
    {
      title: "Grizzly Peaks Radio",
      subtitle: "Andy Goodman",
      coverSrc:
        "https://i.scdn.co/image/850f5a2b54854f56f4f3b01179b9ce84b32ef3b2",
    },
    {
      title: "Grizzly Peaks Radio",
      subtitle: "Andy Goodman",
      coverSrc:
        "https://i.scdn.co/image/850f5a2b54854f56f4f3b01179b9ce84b32ef3b2",
    },
    {
      title: "Grizzly Peaks Radio",
      subtitle: "Andy Goodman",
      coverSrc:
        "https://i.scdn.co/image/850f5a2b54854f56f4f3b01179b9ce84b32ef3b2",
    },
  ];

  return (
    <ScrollArea.Root>
      <ScrollArea.Viewport>
        <div className="flex flex-1 flex-col gap-y-6 p-6 h-screen relative">
          <h1 className="text-4xl font-display font-bold mt-20">Boa noite</h1>
          <section className="flex  flex-wrap gap-x-6 gap-y-4 mt-4">
            <RecentPlayedCard
              currentlyPlaying
              name="Liked songs"
              imgSrc="https://images.unsplash.com/photo-1513104487127-813ea879b8da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2746&q=80"
            />
            <RecentPlayedCard
              name="Liked songs"
              imgSrc="https://images.unsplash.com/photo-1513104487127-813ea879b8da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2746&q=80"
            />
            <RecentPlayedCard
              name="Liked songs"
              imgSrc="https://images.unsplash.com/photo-1513104487127-813ea879b8da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2746&q=80"
            />
            <RecentPlayedCard
              name="Liked songs"
              imgSrc="https://images.unsplash.com/photo-1513104487127-813ea879b8da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2746&q=80"
            />
            <RecentPlayedCard
              name="Liked songs"
              imgSrc="https://images.unsplash.com/photo-1513104487127-813ea879b8da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2746&q=80"
            />
            <RecentPlayedCard
              name="Liked songs"
              imgSrc="https://images.unsplash.com/photo-1513104487127-813ea879b8da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2746&q=80"
            />
          </section>
          <section className="mt-4">
            <header className="flex justify-between items-center">
              <NavLink to="/">
                <h2 className="hover:underline text-3xl font-bold mb-4">
                  Seus Programas
                </h2>
              </NavLink>
              <NavLink to="/">
                <p className="font-bold text-base text-white hover:underline">
                  Mostrar tudo
                </p>
              </NavLink>
            </header>
            <section className="flex flex-wrap gap-6 h-80">
              {testPodcasts.map((p, index) => {
                return (
                  <VerticalCard
                    key={p.title + index}
                    title={p.title}
                    subtitle={p.subtitle}
                    coverSrc={p.coverSrc}
                  />
                );
              })}
            </section>
          </section>
          <section className="mt-4">
            <header className="flex justify-between items-center">
              <NavLink to="/">
                <h2 className="hover:underline text-3xl font-bold mb-4">
                  Seus Programas
                </h2>
              </NavLink>
              <NavLink to="/">
                <p className="font-bold text-base text-white hover:underline">
                  Mostrar tudo
                </p>
              </NavLink>
            </header>
            <section className="flex flex-wrap gap-6 h-80">
              {testPodcasts.map((p, index) => {
                return (
                  <VerticalCard
                    key={p.title + index}
                    title={p.title}
                    subtitle={p.subtitle}
                    coverSrc={p.coverSrc}
                  />
                );
              })}
            </section>
          </section>
          <section className="mt-4">
            <header className="flex justify-between items-center">
              <NavLink to="/">
                <h2 className="hover:underline text-3xl font-bold mb-4">
                  Seus Programas
                </h2>
              </NavLink>
              <NavLink to="/">
                <p className="font-bold text-base text-white hover:underline">
                  Mostrar tudo
                </p>
              </NavLink>
            </header>
            <section className="flex flex-wrap gap-6 h-80">
              {testPodcasts.map((p, index) => {
                return (
                  <VerticalCard
                    key={p.title + index}
                    title={p.title}
                    subtitle={p.subtitle}
                    coverSrc={p.coverSrc}
                  />
                );
              })}
            </section>
          </section>
          <section className="mt-4">
            <header className="flex justify-between items-center">
              <NavLink to="/">
                <h2 className="hover:underline text-3xl font-bold mb-4">
                  Seus Programas
                </h2>
              </NavLink>
              <NavLink to="/">
                <p className="font-bold text-base text-white hover:underline">
                  Mostrar tudo
                </p>
              </NavLink>
            </header>
            <section className="flex flex-wrap gap-6 h-80">
              {testPodcasts.map((p, index) => {
                return (
                  <VerticalCard
                    key={p.title + index}
                    title={p.title}
                    subtitle={p.subtitle}
                    coverSrc={p.coverSrc}
                  />
                );
              })}
            </section>
          </section>
          <section className="mt-4">
            <header className="flex justify-between items-center">
              <NavLink to="/">
                <h2 className="hover:underline text-3xl font-bold mb-4">
                  Seus Programas
                </h2>
              </NavLink>
              <NavLink to="/">
                <p className="font-bold text-base text-white hover:underline">
                  Mostrar tudo
                </p>
              </NavLink>
            </header>
            <section className="flex flex-wrap gap-6 h-80">
              {testPodcasts.map((p, index) => {
                return (
                  <VerticalCard
                    key={p.title + index}
                    title={p.title}
                    subtitle={p.subtitle}
                    coverSrc={p.coverSrc}
                  />
                );
              })}
            </section>
          </section>
          <section className="mt-4">
            <header className="flex justify-between items-center">
              <NavLink to="/">
                <h2 className="hover:underline text-3xl font-bold mb-4">
                  Seus Programas
                </h2>
              </NavLink>
              <NavLink to="/">
                <p className="font-bold text-base text-white hover:underline">
                  Mostrar tudo
                </p>
              </NavLink>
            </header>
            <section className="flex flex-wrap gap-6 h-80">
              {testPodcasts.map((p, index) => {
                return (
                  <VerticalCard
                    key={p.title + index}
                    title={p.title}
                    subtitle={p.subtitle}
                    coverSrc={p.coverSrc}
                  />
                );
              })}
            </section>
          </section>
        </div>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar orientation="vertical">
        <ScrollArea.Thumb />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  );
};
