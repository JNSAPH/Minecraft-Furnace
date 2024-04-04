import CopyPasteTextPill from "@/components/copyPasteTextPill/copyPasteTextPill";
import LogoText from "@/components/logoText/logoText";
import { DocumentationPill, GetStartedPill, GitHubPill } from "@/components/pillButton/pillButton";
import Footer from "@/components/footer/footer";
import GetStartedComponent from "@/components/getStarted/getStarted";
import AboutSection from "@/components/about/about";

export default function Home() {
  return (
    <main className="h-screen bg-bg-dark">
      {/* Head */}
      <section className="h-full w-full flex flex-col bg-gradient-to-t from-bg-dark to-bg-light p-2 md:p-12 space-y-4">
        <div className="flex flex-col space-y-4 justify-center h-full items-center bg-gradient-to-t from-bg-mid to-bg-light rounded-2xl p-4">
          <LogoText />
          <CopyPasteTextPill text={'curl -fsSL https://startfurnace.com/install | bash'} />
        </div>
        <div className="flex flex-wrap flex-row justify-between">
          <div className="flex flex-wrap flex-row space-x-4">
            <DocumentationPill /> 
            <GetStartedPill />
          </div>
          <GitHubPill />
        </div>
      </section>

      {/*  */}
      <section className="bg-bg-dark flex flex-col items-center justify-center">
        <div className="space-y-12 max-w-[1000px] mx-8 pt-12">
          {/* About */}
          <AboutSection />

          <p className="opacity-25 text-center"  id="getStartedAnchor">{"* ".repeat(25)}</p>

          {/* Get Started */}
          <div>
            <GetStartedComponent />
          </div>

          <p className="opacity-25 text-center">{"* ".repeat(25)}</p>

          {/* Video */}
          <div className="flex items-center justify-center">
            <iframe 
            className="max-w-[700px] w-full h-[450px] rounded-2xl"
            src="https://www.youtube-nocookie.com/embed/Didnt_make_the_Video_yet_sorry_guys_:(" title="YouTube video player" allow="autoplay;"></iframe>
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="bg-bg-dark">
        <Footer />
      </section>
    </main>
  );
}
