import { useOrgData } from "../../context/OrgDataContext";
import { useLanguage } from "../../i18n/LanguageContext";
import "./WhatsAppButton.css";

export default function WhatsAppButton() {
  const { t } = useLanguage();
  const { orgInfo } = useOrgData();

  // TODO: Replace with NGO WhatsApp Number (currently using a dummy/sample number)
  const whatsappUrl = `https://wa.me/${orgInfo.whatsappNumber}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-fab"
      aria-label={t("whatsapp.label")}
      title={t("whatsapp.label")}
    >
      <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
        <path
          fill="currentColor"
          d="M16.004 2.667c-7.364 0-13.333 5.97-13.333 13.333 0 2.36.62 4.573 1.706 6.49L2.667 29.333l7.03-1.843a13.27 13.27 0 0 0 6.307 1.61h.006c7.363 0 13.333-5.97 13.333-13.334 0-7.363-5.976-13.099-13.339-13.099Zm0 24.13h-.005a11.04 11.04 0 0 1-5.624-1.54l-.404-.24-4.174 1.094 1.115-4.069-.264-.418a10.95 10.95 0 0 1-1.68-5.857c0-6.057 4.928-10.985 10.99-10.985 2.936 0 5.694 1.146 7.768 3.224a10.91 10.91 0 0 1 3.219 7.769c0 6.058-4.93 10.987-10.94 11.022Zm6.024-8.232c-.33-.165-1.95-.962-2.253-1.073-.303-.11-.523-.165-.743.165-.22.33-.85 1.073-1.04 1.293-.193.22-.385.248-.715.083-.33-.165-1.392-.512-2.652-1.637-.98-.875-1.642-1.955-1.835-2.285-.193-.33-.02-.508.165-.673.165-.165.385-.413.578-.62.193-.207.255-.33.385-.55.13-.22.062-.413-.027-.578-.09-.165-.808-1.945-1.107-2.66-.293-.703-.59-.608-.81-.62-.207-.01-.443-.01-.68-.01a1.31 1.31 0 0 0-.946.443c-.33.33-1.26 1.232-1.26 3.005s1.292 3.484 1.47 3.726c.18.242 2.46 3.755 5.962 5.114 2.965 1.15 3.484.92 4.118.86.633-.06 1.95-.797 2.225-1.567.275-.77.275-1.43.193-1.567-.083-.137-.303-.22-.633-.385Z"
        />
      </svg>
    </a>
  );
}
