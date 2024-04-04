import CopyPasteTextPill from "@/components/copyPasteTextPill/copyPasteTextPill";
import LogoText from "@/components/logoText/logoText";
import { DocumentationPill, GetStartedPill, GitHubPill } from "@/components/pillButton/pillButton";
import Footer from "@/components/footer/footer";
import TutorialTerminal from "@/components/tutorialTerminal/tutorialTerminal";

export default function Home() {
  return (
    <main className="h-screen bg-bg-dark">
      {/* Head */}
      <section className="h-full w-full flex flex-col bg-gradient-to-t from-bg-dark to-bg-light p-12 space-y-4">
        <div className="flex flex-col space-y-4 justify-center h-full items-center bg-gradient-to-t from-bg-mid to-bg-light rounded-2xl">
          <LogoText />
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
        <div className="space-y-24 max-w-[1000px] ">
          {/* About */}
          <div className="grid grid-rows-[auto_auto] gap-x-4 grid-cols-[40px_auto] mx-4">
            <svg height="40" viewBox="0 0 40 40" fill="none" className="stroke-blush">
              <path d="M17.6775 18.4943H19.2845V26.5296M33.7479 20.1014C33.7479 28.0893 27.2724 34.5648 19.2845 34.5648C11.2966 34.5648 4.82114 28.0893 4.82114 20.1014C4.82114 12.1135 11.2966 5.638 19.2845 5.638C27.2724 5.638 33.7479 12.1135 33.7479 20.1014Z" stroke-width="3.21408" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M18.0792 13.6732C18.0792 14.3389 18.6189 14.8785 19.2845 14.8785C19.9502 14.8785 20.4898 14.3389 20.4898 13.6732C20.4898 13.0076 19.9502 12.4679 19.2845 12.4679C18.6189 12.4679 18.0792 13.0076 18.0792 13.6732Z" fill="#DF666C" stroke-width="0.803521" />
            </svg>
            <p className="font-bold text-2xl">About</p>
            <p></p>
            <p>Furnace is a powerful command-line interface (CLI) tool designed to spin up Minecraft servers in a matter of seconds. Whether you're a seasoned Minecraft veteran or just starting out, Furnace offers an easy-to-use and intuitive CLI that guides you through the most important settings, making server setup a breeze.</p>
          </div>

          {/* How it works */}
          <div className="grid grid-rows-[auto_auto] gap-x-4 grid-cols-[40px_auto] mx-4">
            <svg height="40" viewBox="0 0 16 16" fill="none" className="mr-2 stroke-cerise">
              <path d="M4.14583 8.9375H3.12204C2.36298 8.9375 1.88067 8.12502 2.24415 7.45865L2.83471 6.37594C3.36041 5.41216 4.37057 4.8125 5.4684 4.8125H7.42188M4.14583 8.9375L7.0625 11.8542M4.14583 8.9375L7.42188 4.8125M7.0625 11.8542V12.878C7.0625 13.637 7.87498 14.1193 8.54135 13.7559L9.62406 13.1653C10.5878 12.6396 11.1875 11.6294 11.1875 10.5316V8.57812M7.0625 11.8542L11.1875 8.57812M11.1875 8.57812C13.2434 6.69352 14.6078 4.6566 14.8852 2.0611C14.9439 1.51194 14.4881 1.05612 13.9389 1.11482C11.3434 1.39225 9.30648 2.75657 7.42188 4.8125M2.60417 14.9375H2.0625C1.51021 14.9375 1.0625 14.4898 1.0625 13.9375V13.3959C1.0625 12.5444 1.75273 11.8542 2.60417 11.8542C3.45561 11.8542 4.14583 12.5444 4.14583 13.3959C4.14583 14.2473 3.45561 14.9375 2.60417 14.9375Z" stroke-width="1.25" stroke-linejoin="round" />
            </svg>
            <p className="font-bold text-2xl">Get Started</p>
            <p></p>
            <div>
              <div className="grid grid-cols-1 md:grid-cols-[300px_auto] gap-x-4 gap-y-4">
                <div className="space-y-8">
                  <div>
                    <p className="font-bold text-xl">Step 1</p>
                    <p>Run the Installer Script</p>
                  </div>
                  <div>
                    <p className="font-bold text-xl">Step 2</p>
                    <p>Follow the Instructions and fill out the questionnaire</p>
                  </div>
                  <div>
                    <p className="font-bold text-xl">Step 3</p>
                    <p>Start the Server using the generated Script</p>
                  </div>
                </div>
                <TutorialTerminal />
              </div>
            </div>
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