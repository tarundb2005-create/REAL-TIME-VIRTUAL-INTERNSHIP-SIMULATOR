import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement>;

export const LogoIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L2 7l10 5 10-5L12 2zm-10 9v6l10 5 10-5v-6l-10 5-10-5z"></path>
    </svg>
);

export const SunIcon: React.FC<IconProps> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M12 12a5 5 0 100-10 5 5 0 000 10z" />
  </svg>
);

export const MoonIcon: React.FC<IconProps> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>
);

export const SystemIcon: React.FC<IconProps> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-1.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25A2.25 2.25 0 015.25 3h9.75a2.25 2.25 0 012.25 2.25z" />
  </svg>
);

export const AIEngineerIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 21v-1.5M15.75 3v1.5m3.75 3.75H21m-3.75 6.75H21m-3.75 6.75H21m-15-15h1.5m6.75 0h1.5m6.75 0h1.5m-15 15h1.5m6.75 0h1.5m6.75 0h1.5M12 6a.75.75 0 100-1.5.75.75 0 000 1.5zM12 12a.75.75 0 100-1.5.75.75 0 000 1.5zM12 18a.75.75 0 100-1.5.75.75 0 000 1.5z" /></svg>
);

export const DataScientistIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" /></svg>
);

export const MarketingIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 100 15 7.5 7.5 0 000-15zM21 21l-5.197-5.197" /></svg>
);

export const ProductManagerIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.82m5.84-2.56a6 6 0 01-2.56 5.84m-2.56-5.84a6 6 0 015.84 2.56m-8.4-5.84a6 6 0 01-2.56-5.84V18a6 6 0 015.84 7.38m-5.84-7.38a6 6 0 017.38-5.84m-7.38 5.84V4.5A2.25 2.25 0 019.75 2.25h4.5A2.25 2.25 0 0116.5 4.5v4.5m-6.75 0h-1.5" /></svg>
);

export const SoftwareEngineerIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" /></svg>
);

export const BriefcaseIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.075c0 1.313-.964 2.446-2.25 2.613-1.285.166-2.463-.376-3.25-1.375m-4.5 1.375c-.787 1-1.965 1.541-3.25 1.375-1.286-.167-2.25-1.3-2.25-2.613v-4.075m13.5-5.625v-1.875c0-1.242-1.008-2.25-2.25-2.25h-9c-1.242 0-2.25 1.008-2.25 2.25v1.875m13.5 0v1.875c0 .621-.504 1.125-1.125 1.125h-11.25c-.621 0-1.125-.504-1.125-1.125V8.531m13.5 0a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H5.25a2.25 2.25 0 00-2.25 2.25v1.526c0 1.242 1.008 2.25 2.25 2.25h13.5z" /></svg>
);

export const DashboardIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25A2.25 2.25 0 0113.5 8.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /></svg>
);

export const CybersecurityIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286zm0 13.036h.008v.008h-.008v-.008z" /></svg>
);

export const UXDesignIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.73-.664 1.206-.861a7.5 7.5 0 10-9.28 9.28c.197.476.477.89.861 1.206l3.03-2.496zM11.42 15.17L6.83 20.76a2.652 2.652 0 01-3.75-3.75L8.25 12.83" /></svg>
);

export const SendIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" /></svg>
);

export const TaskIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
);

export const CheckCircleIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
);

export const ChartBarIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>
);

export const FeedbackIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345h5.518a.562.562 0 01.321.988l-4.204 3.055a.563.563 0 00-.182.635l1.578 4.87a.562.562 0 01-.84.61l-4.725-3.362a.563.563 0 00-.652 0l-4.725 3.362a.562.562 0 01-.84-.61l1.578-4.87a.563.563 0 00-.182-.635L2.343 9.944a.562.562 0 01.321-.988h5.518a.563.563 0 00.475-.345L11.48 3.5z" /></svg>
);

export const GoogleIcon: React.FC<IconProps> = (props) => (
  <svg {...props} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
    <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
    <path fill="#FF3D00" d="M6.306 14.691c-1.336 2.693-2.094 5.75-2.094 9.019c0 3.269.758 6.326 2.094 9.019l-5.657 5.657C.803 34.935 0 30.686 0 26s.803-8.935 2.649-12.966l5.657 5.657z" />
    <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-5.657-5.657c-1.889 1.411-4.28 2.263-6.752 2.263c-5.22 0-9.643-3.336-11.303-7.962H4.894v.022C7.73 39.52 15.32 44 24 44z"/>
    <path fill="#1976D2" d="M43.611 20.083L43.595 20H24v8h11.303a12.034 12.034 0 0 1-4.524 5.562l5.657 5.657C40.078 35.295 44 29.5 44 24c0-1.341-.138-2.65-.389-3.917z" />
  </svg>
);

export const AmazonIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M17.1,19.34c-2.43,0-4.32-.44-4.32-1.25,0-.56,1-.95,2.15-1.16l2.35-.41c1.23-.22,1.82-.6,1.82-1.34,0-1.1-1.63-1.54-3.5-1.54-2.4,0-4.32.48-5.9,1.3l-1.46-.92c1.76-1.05,4.2-1.58,6.8-1.58,2.8,0,5.65.6,5.65,3.3,0,1.8-1.78,2.73-3.66,3.07l-2.48.44c-1.28.22-1.76.56-1.76,1.06,0,.75,1.53,1.25,3.7,1.25,2.1,0,4.24-.5,5.6-1.3l1.46.92c-1.8,1.04-4.1,1.56-6.53,1.56Zm-.56-13.63a2.38,2.38,0,0,0-2.38,2.37,2.38,2.38,0,0,0,2.38,2.38,2.38,2.38,0,0,0,2.37-2.38A2.37,2.37,0,0,0,16.54,5.71Zm-13,6.58c0-3.33,2-4.48,4.14-4.48S12,9,12,12.28a9.45,9.45,0,0,1-8.42.05Z" /></svg>
);

export const MetaIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M23.05,7.93A13.43,13.43,0,0,0,15.17,5.5a13.43,13.43,0,0,0-7.88,2.43,13.15,13.15,0,0,0-4.24,11.2,12.8,12.8,0,0,0,1.36,4.64,13,13,0,0,0,2.88,3.58,13.43,13.43,0,0,0,7.88,2.43,13.43,13.43,0,0,0,7.88-2.43,13,13,0,0,0,2.88-3.58,12.8,12.8,0,0,0,1.36-4.64,13.15,13.15,0,0,0-4.24-11.2M15,18.15a5,5,0,0,1-2.28.53,4.9,4.9,0,0,1-2.65-2.82,5,5,0,0,1,1-5.18,4.9,4.9,0,0,1,6.56-.47L15,12.89a2.4,2.4,0,0,0-1.27-.37,2.48,2.48,0,0,0-2.55,3.22,2.47,2.47,0,0,0,3.81,0,2.4,2.4,0,0,0-1.28-2.85l2.67-2.67a5,5,0,0,1-1.38,7.93" /></svg>
);

export const NetflixIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M8.72,22,8.42,2H5V22H8.72M15.28,2l.3,20H19V2H15.28M8.72,2h6.56L8.72,22V2Z" /></svg>
);

export const AppleIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19.67,16.72a3.4,3.4,0,0,1-1.8,3,3.37,3.37,0,0,1-2.1.18,2.69,2.69,0,0,1-1.81-1,2.8,2.8,0,0,1-1-1.89,1.76,1.76,0,0,1,.6-1.42,2.15,2.15,0,0,1,1.51-.62h.11a2.1,2.1,0,0,1,1.52.66,1.7,1.7,0,0,0,.6.58,1.6,1.6,0,0,0,1.13.42,1.74,1.74,0,0,0,1.19-.44,2.83,2.83,0,0,1,2-1.15,2.75,2.75,0,0,1,2.1.86A5.29,5.29,0,0,0,22,13.41,6,6,0,0,0,16.88,8.23a5.7,5.7,0,0,0-4.66-2.6,5.82,5.82,0,0,0-5.14,3,5.83,5.83,0,0,0-2.81,5,6.1,6.1,0,0,0,1.2,4,6.23,6.23,0,0,0,3.3,2.45,5.39,5.39,0,0,0,4.27-.51,2.5,2.5,0,0,0,1.22-2.14,3.76,3.76,0,0,0-1.45-3.05M15.11,5.23a5.18,5.18,0,0,0,1.6-3.66,5.36,5.36,0,0,0-3.32,2,5.12,5.12,0,0,0-1.5,3.56A5.43,5.43,0,0,0,15.11,5.23Z" /></svg>
);

export const AtlassianIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12.72,23.36,2.22,17.43a1.44,1.44,0,0,1-.72-1.25V7.82a1.44,1.44,0,0,1,.72-1.25l10.5-5.93a1.44,1.44,0,0,1,1.45,0l10.5,5.93a1.44,1.44,0,0,1,.72,1.25v8.36a1.44,1.44,0,0,1-.72,1.25L14.17,23.36A1.44,1.44,0,0,1,12.72,23.36ZM4.49,15.75,12,19.83l7.51-4.08V9.52L12,5.44,4.49,9.52Z" /></svg>
);

export const ZohoIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10.8,8.4H2.4v7.2H10.8V8.4Zm0-6H2.4V7.2H10.8V2.4Zm10.8,6H13.2v7.2h8.4V8.4Zm-5.85,3.75a2.55,2.55,0,1,1,2.55-2.55A2.55,2.55,0,0,1,15.75,12.15Z" /></svg>
);

export const BrainIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.572L16.25 21l-.648-.428a2.25 2.25 0 01-1.47-2.118l.292-1.848a2.25 2.25 0 00-1.47-2.118l-1.848-.292a2.25 2.25 0 00-2.118 1.47l-.428.648L9.75 18l.428.648a2.25 2.25 0 002.118 1.47l1.848.292a2.25 2.25 0 002.118-1.47l.292-1.848a2.25 2.25 0 012.118-1.47l.648-.428L18 16.25l.648.428a2.25 2.25 0 011.47 2.118l-.292 1.848a2.25 2.25 0 001.47 2.118l1.848.292a2.25 2.25 0 002.118-1.47l.428-.648L21.75 18l-.428-.648a2.25 2.25 0 00-2.118-1.47l-1.848-.292a2.25 2.25 0 00-2.118 1.47l-.292 1.848a2.25 2.25 0 01-2.118 1.47z" /></svg>
);

export const ChatBubbleIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.76 9.76 0 01-2.53-.388m-5.182-3.319a23.945 23.945 0 01-.658-6.082C3.288 6.444 7.343 3.75 12 3.75c4.761 0 8.683 2.57 9.001 5.834a5.937 5.937 0 01.956 3.416z" /></svg>
);

export const ImageIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>
);

export const VideoCameraIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9A2.25 2.25 0 004.5 18.75z" /></svg>
);

export const AcademicCapIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0l-1.07-1.07a51.282 51.282 0 013.172-4.971l1.07 1.07c-1.067 1.25-2.072 2.624-2.883 4.103z" /></svg>
);

export const PlaygroundIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c.506 0 1.012-.042 1.518-.124M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 4.5A.75.75 0 0013.5 15h.008a.75.75 0 00.704-.843l-.348-1.636a.75.75 0 111.416-.301l.348 1.636A2.25 2.25 0 0113.5 18H12a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75v-.008A.75.75 0 0012 18h-.008a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V18a2.25 2.25 0 00-2.25-2.25H9.75A.75.75 0 119 15h.008a.75.75 0 01.704.843l.348 1.636a.75.75 0 101.416-.301l-.348-1.636A2.25 2.25 0 009.75 13.5H9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75v-.008A.75.75 0 009 15h.008a.75.75 0 00.75-.75V15a2.25 2.25 0 012.25-2.25h.008a2.25 2.25 0 012.25 2.25v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75v-.008a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75v-.008ZM12 6.75A.75.75 0 0112.75 6h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008A.75.75 0 0112 6.75z" /></svg>
);

export const BookOpenIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>
);

export const CodeBracketIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" /></svg>
);

export const ArrowLeftIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
    </svg>
);