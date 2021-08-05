import { FaWhatsapp } from 'react-icons/fa';
import { FiMail, FiYoutube, FiInstagram } from 'react-icons/fi';

function FooterSection({ children }) {
  return (
    <div className="w-96 my-4">
      <div className="w-max mx-auto">{children}</div>
    </div>
  );
}

function FooterHeader({ text }) {
  return <h3 className="text-xl font-semibold my-2">{text}</h3>;
}

function FooterContents({ Icon, text }) {
  return (
    <div className="flex items-center my-6">
      <Icon className="h-6 w-6 text-red-white" />
      <p className="ml-4">{text}</p>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-footer text-white">
      <div className="mx-auto py-4 flex flex-wrap justify-evenly max-w-6xl">
        <FooterSection>
          <div className="flex">
            <img src="/assets/pemro.png" alt="pemro" className="h-24 p-2" />
            <img src="/assets/logo.svg" alt="postgre" className="h-24 p-2" />
          </div>
        </FooterSection>
        <FooterSection>
          <FooterHeader text="Contact Person" />
          <FooterContents Icon={FaWhatsapp} text="Johar +62 8788 9877 979" />
          <FooterContents Icon={FaWhatsapp} text="Kukuh +62 8357 9272 989" />
        </FooterSection>
        <FooterSection>
          <FooterHeader text="Social Media" />
          <FooterContents Icon={FiYoutube} text="Lab. Pemro Official" />
          <FooterContents Icon={FiInstagram} text="@pemroilkom_unej" />
        </FooterSection>
        <FooterSection>
          <FooterHeader text="E-mail" />
          <FooterContents Icon={FiMail} text="pemroofficial@cs.unej.id" />
        </FooterSection>
      </div>
      <h3 className="text-sm text-center p-2 border-t border-gray-300">
        Copyright © 2021 Pemro All rights reserved.
      </h3>
    </footer>
  );
}
