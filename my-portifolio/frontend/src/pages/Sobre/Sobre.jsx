import style from "./Sobre.module.css";
import { useTranslation } from "react-i18next";
import BackgroundCanvas from "../../components/BackgroundCanvas";
import minhaFoto from "../../assets/minhaFoto.jpg";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import ApartmentIcon from "@mui/icons-material/Apartment";
import SchoolIcon from "@mui/icons-material/School";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

export default function Sobre() {
  const { t } = useTranslation();

  return (
    <section className={style.sobrePage}>
      <BackgroundCanvas />

      <div className={style.container}>
        {/* FOTO */}
        <div className={style.photoSection}>
          <div className={style.photoWrapper}>
            <div className={style.photoCircle}>
              <img src={minhaFoto} alt="Foto do dev" />
            </div>
          </div>
          <h1 className={style.mainTitle}>{t("about.mainTitle")}</h1>
        </div>

        {/* SOBRE MIM */}
        <div className={style.section}>
          <h2 className={style.sectionTitle}>{t("about.whoTitle")}</h2>
          <p className={style.description}>
            {t("about.description")}
          </p>
        </div>

        {/* EXPERIÊNCIA */}
        <div className={style.section}>
          <h2 className={style.sectionTitle}>{t("about.expTitle")}</h2>
          <p className={style.subtitle}>
            {t("about.expSubtitle")}
          </p>

          <div className={style.timeline}>
            {/* Item 1 */}
            <div className={style.timelineItem}>
              <div className={style.timelineIcon}>
                <BusinessCenterIcon />
              </div>

              <div className={style.card}>
                <h3>{t("about.job1.title")}</h3>
                <span className={style.company}>
                  <ApartmentIcon fontSize="small" /> {t("about.job1.company")}
                </span>
                <p className={style.cardDate}>
                  {t("about.job1.period")}
                </p>
                <p>{t("about.job1.description")}</p>
              </div>
            </div>

            {/* Item 2 */}
            <div className={style.timelineItem}>
              <div className={style.timelineIcon}>
                <BusinessCenterIcon />
              </div>

              <div className={style.card}>
                <h3>{t("about.job2.title")}</h3>
                <span className={style.company}>
                  <ApartmentIcon fontSize="small" /> {t("about.job2.company")}
                </span>
                <p className={style.cardDate}>
                  {t("about.job2.period")}
                </p>
                <p>{t("about.job2.description")}</p>
              </div>
            </div>
          </div>
        </div>

        {/* INDICADORES */}
        <div className={style.section}>
          <h2 className={style.sectionTitle}>{t("about.indicatorsTitle")}</h2>

          <div className={style.statsBox}>
            <div className={style.statsHeader}>
              <TrendingUpIcon />
              <span>{t("about.statsTitle")}</span>
            </div>

            <div className={style.stats}>
              <div className={style.statItem}>
                <h3>5</h3>
                <span>{t("about.stats.projects")}</span>
              </div>
              <div className={style.statItem}>
                <h3>3</h3>
                <span>{t("about.stats.years")}</span>
              </div>
              <div className={style.statItem}>
                <h3>1</h3>
                <span>{t("about.stats.clients")}</span>
              </div>
              <div className={style.statItem}>
                <h3>23</h3>
                <span>{t("about.stats.commits")}</span>
              </div>
              <div className={style.statItem}>
                <h3>100+</h3>
                <span>{t("about.stats.coffee")}</span>
              </div>
            </div>
          </div>

          <div className={style.academicBox}>
            <h3 className={style.academicTitle}>
              <SchoolIcon /> {t("about.academicTitle")}
            </h3>

            <div className={style.progressItem}>
              <div className={style.progressLabel}>
                <span>{t("about.academic.software")}</span>
                <span className={style.progressPercent}>60%</span>
              </div>
              <div className={style.progressBar}>
                <div style={{ width: "60%" }}></div>
              </div>
            </div>

            <div className={style.progressItem}>
              <div className={style.progressLabel}>
                <span>{t("about.academic.js")}</span>
                <span className={style.progressPercent}>30%</span>
              </div>
              <div className={style.progressBar}>
                <div style={{ width: "30%" }}></div>
              </div>
            </div>

            <div className={style.progressItem}>
              <div className={style.progressLabel}>
                <span>{t("about.academic.python")}</span>
                <span className={style.progressPercent}>100%</span>
              </div>
              <div className={style.progressBar}>
                <div style={{ width: "100%" }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}