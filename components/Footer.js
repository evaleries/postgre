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
    <div className="flex items-center my-6 cursor-pointer hover:scale-105 active:scale-100 transition-transform">
      <Icon className="h-6 w-6 text-red-white" />
      <p className="ml-4">{text}</p>
    </div>
  );
}

export default function Footer() {
  const WA_BASE_URL = 'https://wa.me/';

  return (
    <footer id="footer" className="bg-footer text-white">
      <div className="mx-auto py-4 flex flex-wrap justify-evenly max-w-6xl">
        <FooterSection>
          <div className="flex">
            <img src="/assets/pemro.png" alt="pemro" className="h-24 p-2" />
            <img src="/assets/logo.svg" alt="postgre" className="h-24 p-2" />
          </div>
        </FooterSection>
        <FooterSection>
          <FooterHeader text="Contact Person" />
          <a href={WA_BASE_URL + '+6282139997597'} target="_blank">
            <FooterContents
              Icon={FaWhatsapp}
              text="Fakhrii +62 821 3999 7597"
            />
          </a>
          <a href={WA_BASE_URL + '+6283847193167'} target="_blank">
            <FooterContents Icon={FaWhatsapp} text="Wisnu +62 838 4719 3167" />
          </a>
          <a href={WA_BASE_URL + '+62895630905343'} target="_blank">
            <FooterContents Icon={FaWhatsapp} text="Mikli +62 895 6309 05343" />
          </a>
        </FooterSection>
        <FooterSection>
          <FooterHeader text="Social Media" />
          <a
            href="https://www.youtube.com/channel/UCtgRiN1tHOvmZXKQoBkTlwg"
            target="_blank"
          >
            <FooterContents Icon={FiYoutube} text="Lab. Pemro Official" />
          </a>
          <a href="https://www.instagram.com/pemroilkom_unej" target="_blank">
            <FooterContents Icon={FiInstagram} text="@pemroilkom_unej" />
          </a>
        </FooterSection>
        <FooterSection>
          <FooterHeader text="E-mail" />
          <a href="mailto:pemroofficial@cs.unej.id">
            <FooterContents Icon={FiMail} text="pemroofficial@cs.unej.id" />
          </a>
        </FooterSection>
      </div>
      <h3 className="text-sm text-center p-2 border-t border-gray-300">
        Copyright © 2021 Pemro All rights reserved.
      </h3>
    </footer>
  );
}
