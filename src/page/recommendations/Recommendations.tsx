import { useState, FormEvent } from "react";
import * as recommendationsServise from '../../services/RecommendationService';
import { Recommendation } from "../../types/CommonTypes";

interface Props {
  selectedAnalyzeId?: string;
  recommendations?: Recommendation | null;
}

export default function RecommendationsBlock({
  selectedAnalyzeId,
  recommendations} : Props) {
    const [editMode, setEditMode] = useState(false);
    const [conclusion, setConclusion] = useState(recommendations?.conclusion ?? "");
    const [recommendation, setRecommendation] = useState(recommendations?.recommendation ?? "");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    
    const toggleEditMode = () => {
      setEditMode(!editMode);
    }

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      if (name === "conclusion") {
        setConclusion(value);
      } else if (name === "recommendation") {
        setRecommendation(value);
      }
    }

    const handleSubmit = async (event: FormEvent) => {
      event.preventDefault();
      setLoading(true);
      setError("");

      try {
        const recommendationData: Recommendation = {
          conclusion: conclusion,
          recommendation: recommendation,
        }
        let data;
        const recommendationId = recommendations?.id;
        if (recommendationId) {
          data = await recommendationsServise.updateRecommendation(recommendationData, recommendationId);
        } else {
          data = await recommendationsServise.saveNewRecommendation(recommendationData, Number(selectedAnalyzeId));
        }
        if (data) {
          setConclusion(data.conclusion ?? conclusion);
          setRecommendation(data.recommendation ?? recommendation);
        } else {
          setConclusion("");
          setRecommendation("");
          setError("Ошибка: данные не были получены")
        }
        setEditMode(false);
      } catch (err) {
          if (err instanceof Error) {
              setConclusion("");
              setRecommendation("");
              setError("Ошибка: " + err.message);
          } else {
              setConclusion("");
              setRecommendation("");
              setError("Ошибка сохранения: " + err);
          }
      }
      setLoading(false);
    }

    return (
      <>
        {recommendations?.errorMessage === null &&
          <form onSubmit={handleSubmit} className="container-fluid">
            <div>
              <label htmlFor="conclusionArea" className="fw-bold">Заключение:</label>
              <div className="mt-2">
                <textarea
                  className="w-100"
                  id="conclusionArea"
                  name="conclusion"
                  value={conclusion}
                  onChange={handleChange}
                  disabled={!editMode}
                />
              </div>
            </div>

            <div>
              <label htmlFor="recommendationArea" className="fw-bold">Рекомендация:</label>
              <div className="mt-2">
                <textarea
                  className="w-100"
                  id="recommendationArea"
                  name="recommendation"
                  value={recommendation}
                  onChange={handleChange}
                  disabled={!editMode}
                />
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
                  title="Сохранить изменения">
                    {loading &&
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    }
                  Сохранить
                </button>
              }
              <button
                type="button"
                onClick={toggleEditMode}
                className="btn btn-outline-secondary ms-3 float-end"
                disabled={loading}
                title={editMode ? "Отмена изменений" : "Редактировать сведения"}
                >
                {editMode ? "Отмена" : "Редактировать"}
              </button>
            </div>
          </form>
        }
      </>
    )
};
