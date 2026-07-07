import { useLanguage } from "../i18n/LanguageContext";
import Button from "../components/ui/Button";
import "./NotFoundPage.css";

export default function NotFoundPage() {
  const { t } = useLanguage();

  return (
    <div className="not-found">
      <div className="container not-found__inner">
        <span className="not-found__code">404</span>
        <h1>Page not found</h1>
        <p>The page you're looking for doesn't exist or may have moved.</p>
        <Button to="/" variant="primary">
          {t("common.backToHome")}
        </Button>
      </div>
    </div>
  );
}
