import { useState, FormEvent } from "react";
import * as recommendationsServise from '../../services/RecommendationService';
import { ChartType, LocaleContent, Recommendation } from "../../types/CommonTypes";
import { useTranslation } from "react-i18next";

interface Props {
  selectedAnalyzeId?: string;
  recommendations?: Recommendation | null;
}

export default function RecommendationsBlock({
  selectedAnalyzeId,
  recommendations
}: Props) {
  const [editMode, setEditMode] = useState(false);
  const [localeContent, setLocaleContent] = useState(recommendations?.localeContent ?? null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { t } = useTranslation();

  const chartType = recommendations?.chartType;

  const toggleEditMode = () => {
    setEditMode(!editMode);
  }

  const handleChange = (lang: string, field: keyof LocaleContent) => (e: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>) => {
    const { value } = e.target;
    setLocaleContent((prev) => {
      // Берем текущий объект для языка, если его нет — создаем новый
      const currentLangData = prev?.[lang] || { locale: lang, conclusionText: null, recommendationText: null };

      return {
        ...prev,
        [lang]: {
          ...currentLangData,
          [field]: value,
        },
      };
    });
    console.log("new data: " + JSON.stringify(localeContent))
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const recommendationData: Recommendation = {
        localeContent: localeContent
      }
      let data;
      const recommendationId = recommendations?.id;
      const chartType = recommendations?.chartType;
      if (recommendationId) {
        data = await recommendationsServise.updateRecommendation(recommendationData, recommendationId);
      }
      if (chartType) {
        data = await recommendationsServise.saveNewRecommendation(recommendationData, Number(selectedAnalyzeId), chartType);
      }
      if (data) {
        setLocaleContent(data.localeContent ?? localeContent)
      } else {
        setError("Ошибка: данные не были получены")
      }
      setEditMode(false);
    } catch (err) {
      if (err instanceof Error) {
        setLocaleContent(null)
        setError("Ошибка: " + err.message);
      } else {
        setLocaleContent(null)
        setError("Ошибка сохранения: " + err);
      }
    }
    setLoading(false);
  }

  return (
    <>
      {recommendations?.errorMessage === null &&
        <form onSubmit={handleSubmit} className="container-fluid">

          <ul className="nav nav-tabs" id={`recommendationTab-${chartType}`} role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className="nav-link active text-black"
                id={`rus-tab-${chartType}`}
                data-bs-toggle="tab"
                data-bs-target={`#rus-${chartType}`}
                type="button"
                role="tab"
                aria-selected="true">
                RUS
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link text-black"
                id={`eng-tab-${chartType}`}
                data-bs-toggle="tab"
                data-bs-target={`#eng-${chartType}`}
                type="button"
                role="tab"
                aria-selected="false">
                ENG
              </button>
            </li>
          </ul>

          <div className="tab-content" id={`recommendationTabContent-${chartType}`}>
            <div
              className="tab-pane fade show active"
              id={`rus-${chartType}`}
              role="tabpanel"
              aria-labelledby="rus-tab">

              <div className="mt-2">
                <label htmlFor={`conclusionAreaRus-${chartType}`} className="fw-bold">{t('recommendationBlock.conclusion')}:</label>
                <div className="mt-2">
                  <textarea
                    className="w-100"
                    id={`conclusionAreaRus-${chartType}`}
                    name="conclusion"
                    value={localeContent?.['RUS']?.conclusionText || ''}
                    onChange={handleChange('RUS', 'conclusionText')}
                    disabled={!editMode}
                  />
                </div>
              </div>

              <div className="mt-2">
                <label htmlFor={`recommendationAreaRus-${chartType}`} className="fw-bold">{t('recommendationBlock.recommendation')}:</label>
                <div className="mt-2">
                  <textarea
                    className="w-100"
                    id={`recommendationAreaRus-${chartType}`}
                    name="recommendation"
                    value={localeContent?.['RUS']?.recommendationText || ''}
                    onChange={handleChange('RUS', 'recommendationText')}
                    disabled={!editMode}
                  />
                </div>
              </div>
            </div>

            <div
              className="tab-pane fade"
              id={`eng-${chartType}`}
              role="tabpanel"
              aria-labelledby="eng-tab">

              <div className="mt-2">
                <label htmlFor={`conclusionAreaEng-${chartType}`} className="fw-bold">{t('recommendationBlock.conclusion')}:</label>
                <div className="mt-2">
                  <textarea
                    className="w-100"
                    id={`conclusionAreaEng-${chartType}`}
                    name="conclusion"
                    value={localeContent?.['ENG']?.conclusionText || ''}
                    onChange={handleChange('ENG', 'conclusionText')}
                    disabled={!editMode}
                  />
                </div>
              </div>

              <div className="mt-2">
                <label htmlFor={`recommendationAreaEng-${chartType}`} className="fw-bold">{t('recommendationBlock.recommendation')}:</label>
                <div className="mt-2">
                  <textarea
                    className="w-100"
                    id={`recommendationAreaEng-${chartType}`}
                    name="recommendation"
                    value={localeContent?.['ENG']?.recommendationText || ''}
                    onChange={handleChange('ENG', 'recommendationText')}
                    disabled={!editMode}
                  />
                </div>
              </div>
            </div>
          </div>


          {error &&
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          }

          <div className="d-flex justify-content-end mt-3">
            {editMode &&
              <button type="submit"
                className="btn btn-outline-success float-end"
                disabled={loading}
                title={t('recommendationBlock.saveTooltip')}>
                {loading &&
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                }
                {t('recommendationBlock.save')}
              </button>
            }
            <button
              type="button"
              onClick={toggleEditMode}
              className="btn btn-outline-dark ms-3 float-end"
              disabled={loading}
              title={editMode ? t('recommendationBlock.cancelTooltip') : t('recommendationBlock.editTooltip')}
            >
              {editMode ? t('recommendationBlock.cancel') : t('recommendationBlock.edit')}
            </button>
          </div>
        </form>
      }
    </>
  )
};
