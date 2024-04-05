const Footer = () => {
    return (
        <footer className="flex flex-col items-center space-y-1 justify-end pb-8 h-[250px] w-full">
            <div className="flex space-x-4">
                <a href="https://jnsaph.com/privacy" className="transition cursor-pointer select-none text-white hover:text-gray-400 active:text-gray-500">Privacy Policy</a>
                <a href="https://jnsaph.com/legal-notice" className="transition cursor-pointer select-none text-white hover:text-gray-400 active:text-gray-500">Legal Notice</a>
            </div>
            <p>© <a href="https://jnsaph.com">JNSAPH</a>. All Rights Reserved.</p>
        </footer>
    );
}

export default Footer;