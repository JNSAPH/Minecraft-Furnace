const LogoText = () => {
    let logoText = ""
    logoText += "███████╗██╗░░░██╗██████╗░███╗░░██╗░█████╗░░█████╗░███████╗\n"
    logoText += "██╔════╝██║░░░██║██╔══██╗████╗░██║██╔══██╗██╔══██╗██╔════╝\n"
    logoText += "█████╗░░██║░░░██║██████╔╝██╔██╗██║███████║██║░░╚═╝█████╗░░\n"
    logoText += "██╔══╝░░██║░░░██║██╔══██╗██║╚████║██╔══██║██║░░██╗██╔══╝░░\n"
    logoText += "██║░░░░░╚██████╔╝██║░░██║██║░╚███║██║░░██║╚█████╔╝███████╗\n"
    logoText += "╚═╝░░░░░░╚═════╝░╚═╝░░╚═╝╚═╝░░╚══╝╚═╝░░╚═╝░╚════╝░╚══════╝"

    // Glitch effect on text
    const glitch = (text: string) => {
        let newText = ""
        for (let i = 0; i < text.length; i++) {
            if (Math.random() > 0.9 && text[i] !== "\n") {
                newText += String.fromCharCode(Math.random() * 93 + 33)
            } else {
                newText += text[i]
            }
        }
        return newText
    }


    return (
        <pre className="leading-[19px] text-transparent bg-clip-text bg-gradient-to-b from-cerise to-blush">
            {logoText}
        </pre>
    )
}

export default LogoText;