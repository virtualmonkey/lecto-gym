import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import './index.scss';

import { getDateFromIsoString } from '../../utils/functions'; 
import * as resultsActions from '../../redux/results/results.actions';
import * as selectors from '../../redux/rootReducer';
import { Link } from 'react-router-dom';

const Results = ({
  initialTestResult,
  finalTestResult,
  improvement,
  isFetchingResults,
  fetchResultsError,
  fetchResults
}) => {

  useEffect(() => {
    fetchResults();
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <div className="page-container--results">
        <div className="results">
          {fetchResultsError && (
            <div className="results__error-message">
              Error al cargar resultados, por favor intenta de nuevo
            </div>
          )}
          <h1 className="results__title">
            Tus resultados
          </h1>
          <div className="results__text">
            Es momento de ver qué tanto has mejorado a lo largo de estas semanas
          </div>
          {(isFetchingResults) ? <></> : (
            <div className="results__container">
              <div className="results__tests-container">
                {initialTestResult && (
                  <div className="results__test-result-container">
                    <div className="results__test-result-title">
                      {`Prueba inicial (${getDateFromIsoString(initialTestResult.created_at)})`}
                    </div>
                    <div className="results__test-result-field">
                      <div className="results__test-result-label">
                        % de respuestas correctas:
                      </div>
                      <div className="results__test-result-number">
                        {initialTestResult.words_percentage}%
                      </div>
                    </div>
                    <div className="results__test-result-field">
                      <div className="results__test-result-label">
                        Tiempo de lectura:
                      </div>
                      <div className="results__test-result-number">
                        {initialTestResult.time}
                      </div>
                    </div>
                    <div className="results__test-result-field">
                      <div className="results__test-result-label">
                        Palabras leídas por minuto:
                      </div>
                      <div className="results__test-result-number">
                        {initialTestResult.words_per_minute}
                      </div>
                    </div>
                  </div>
                )}
                {finalTestResult && (
                  <div className="results__test-result-container">
                    <div className="results__test-result-title">
                      {`Prueba final (${getDateFromIsoString(finalTestResult.created_at)})`}
                    </div>
                    <div className="results__test-result-field">
                      <div className="results__test-result-label">
                        % de respuestas correctas:
                      </div>
                      <div className="results__test-result-number">
                        {finalTestResult.words_percentage}%
                      </div>
                    </div>
                    <div className="results__test-result-field">
                      <div className="results__test-result-label">
                        Tiempo de lectura:
                      </div>
                      <div className="results__test-result-number">
                        {finalTestResult.time}
                      </div>
                    </div>
                    <div className="results__test-result-field">
                      <div className="results__test-result-label">
                        Palabras leídas por minuto:
                      </div>
                      <div className="results__test-result-number">
                        {finalTestResult.words_per_minute}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {improvement && (
                <div className="results__improvement-container">
                  <div className="results__improvement-title">
                    ¿Cuánto has mejorado?
                  </div>
                  <div className="results__improvement-number">
                    {improvement.words_percentage.toFixed(2)}%
                  </div>
                  <div className="results__improvement-text">
                    Porcentaje de mejora de tu comprensión lectora
                  </div>
                  <div className="results__improvement-number">
                    {improvement.words_per_minute.toFixed(2)}%
                  </div>
                  <div className="results__improvement-text">
                    Porcentaje de mejora de palabras leídas por minuto
                  </div>
                </div>
              )}
            </div>
          )}
          <Link
            className="results__link"
            to="/dashboard"
          >
            Regresar al dashboard
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  initialTestResult: selectors.getInitialTestResult(state),
  finalTestResult: selectors.getFinalTestResult(state),
  improvement: selectors.getImprovement(state),
  isFetchingResults: selectors.getIsFetchingResults(state),
  fetchResultsError: selectors.getFetchResultsError(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchResults: () => dispatch(resultsActions.startFetchResults()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Results);