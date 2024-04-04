import CopyPasteTextPill from "@/components/copyPasteTextPill/copyPasteTextPill";
import LogoText from "@/components/logoText/logoText";
import { DocumentationPill, GetStartedPill, GitHubPill } from "@/components/pillButton/pillButton";
import Footer from "@/components/footer/footer";

export default function Home() {
  return (
    <main className="h-screen bg-bg-dark">
      {/* Head */}
      <section className="h-full w-full flex flex-col bg-gradient-to-t from-bg-dark to-bg-light p-12 space-y-4">
        <div className="flex flex-col space-y-4 justify-center h-full items-center bg-gradient-to-t from-bg-mid to-bg-light rounded-2xl">
          {LogoText()}
          <CopyPasteTextPill text={'Command to be determined'} />
        </div>
        <div className="flex flex-row justify-between">
          <div className="flex flex-row space-x-4">
            {/* <DocumentationPill /> */}
            <GetStartedPill />
          </div>
          <GitHubPill />
        </div>
      </section>

      {/*  */}
      <section className="bg-bg-dark flex flex-col items-center justify-center">
        <div className="space-y-16">
          {/* About */}
          <div className="grid grid-rows-[auto_auto] gap-x-4 grid-cols-[40px_auto] max-w-[800px] mx-4">
            <svg height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.6775 18.4943H19.2845V26.5296M33.7479 20.1014C33.7479 28.0893 27.2724 34.5648 19.2845 34.5648C11.2966 34.5648 4.82114 28.0893 4.82114 20.1014C4.82114 12.1135 11.2966 5.638 19.2845 5.638C27.2724 5.638 33.7479 12.1135 33.7479 20.1014Z" stroke="#EF0B73" stroke-width="3.21408" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M18.0792 13.6732C18.0792 14.3389 18.6189 14.8785 19.2845 14.8785C19.9502 14.8785 20.4898 14.3389 20.4898 13.6732C20.4898 13.0076 19.9502 12.4679 19.2845 12.4679C18.6189 12.4679 18.0792 13.0076 18.0792 13.6732Z" fill="#EF0B73" stroke="#EF0B73" stroke-width="0.803521" />
            </svg>
            <p className="font-bold text-2xl">About</p>
            <p></p>
            <p>Furnace is a powerful command-line interface (CLI) tool designed to spin up Minecraft servers in a matter of seconds. Whether you're a seasoned Minecraft veteran or just starting out, Furnace offers an easy-to-use and intuitive CLI that guides you through the most important settings, making server setup a breeze.</p>
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



/*
        
*/