import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import Timer from '../../components/Timer';
import CustomLink from '../../components/CustomLink';
import { useHistory } from "react-router-dom";
import './index.scss';

import * as timerActions from '../../redux/timer/timer.actions';
import * as selectors from '../../redux/rootReducer';

const FinalTestLecture = ({
  authUser,
  onResetTimer,
  onStartTimer,
  onStopTimer,
}) => {
  const history = useHistory();

  useEffect(() => {
    onResetTimer();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    onStartTimer();
  }, [onStartTimer]);

  useEffect(() => {
    if (authUser.has_completed_final_test) {
      history.push("/results");
    }
  }, [authUser, history]);

  return (
    <Fragment>
      <div className="page-container--final-test-lecture">
        <div className="final-test-lecture">
          <h1 className="final-test-lecture__title">
            Lectura de diagnóstico
          </h1>
          <div className="final-test-lecture__timer-container">
            <div className="final-test-lecture__timer-label">
              Tiempo de lectura:
            </div>
            <Timer />
          </div>
          <div className="final-test-lecture__lecture-container">
            <div className="final-test-lecture__lecture-title">
              Galletitas
            </div>
            <div className="final-test-lecture__text">
              <p>
                A una estación de trenes llega una tarde una señora muy elegante. En la ventanilla le informan que el tren 
                está retrasado y que tardará aproximadamente una hora en llegar a la estación.
              </p>
              <p>
                Un poco fastidiada, la señora va al puesto de diarios y compra una revista, luego pasa al kiosco y compra 
                un paquete de galletitas y una lata de gaseosa.
              </p>
              <p>
                Imprevistamente la señora ve, por el rabillo del ojo, cómo el muchacho, sin decir una palabra, estira la 
                mano, agarra el paquete de galletitas, lo abre y después de sacar una comienza a comérsela despreocupadamente. 
                La mujer está indignada. No está dispuesta a ser grosera, pero tampoco a hacer de cuenta que nada ha 
                pasado; así que, con un gesto ampuloso, toma el paquete y saca una galletita que exhibe frente al joven 
                y se la come mirándolo fijamente.
              </p>
              <p>
                Por toda respuesta, el joven sonríe... y toma otra galletita.
              </p>
              <p>
                La señora gime un poco, toma una nueva galletita y, con ostensibles señales de fastidio, se la come 
                sosteniendo otra vez la mirada en el muchacho.
              </p>
              <p>
                El diálogo de miradas y sonrisas continúa entre galleta y galleta. La señora cada vez más irritada, el 
                muchacho cada vez más divertido.
              </p>
              <p>
                Finalmente, la señora se da cuenta de que en el paquete queda sólo la última galletita. “No podrá ser 
                tan caradura”, piensa, y se queda como congelada mirando alternativamente al joven y a las galletitas. 
                Con calma, el muchacho alarga la mano, toma la última galletita y, con mucha suavidad, la corta exactamente 
                por la mitad. Con su sonrisa más amorosa le ofrece media galleta a la señora.
              </p>
              <p>
                - Gracias - dice la mujer tomando con rudeza la media galletita.
              </p>
              <p>
                - De nada - contesta el joven sonriendo angelical mientras come su mitad.
              </p>
              <p>
                El tren llega. Furiosa, la señora se levanta con sus cosas y sube al tren. Al arrancar desde el vagón ve al
                muchacho todavía sentado en el banco del andén y piensa: “Insolente”. Siente la boca reseca de ira. Abre
                la cartera para sacar la lata de gaseosa y se sorprende al encontrar, cerrado, su paquete de 
                galletitas... ¡intacto!
              </p>
            </div>
            <hr></hr>
            <CustomLink
              className="final-test-lecture__link"
              to="/final-test-questions"
              onClick={onStopTimer}
            >
              Realizar prueba
            </CustomLink>
          </div>

        </div>
      </div>
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
  authUser: selectors.getAuthUser(state),
});

const mapDispatchToProps = (dispatch) => ({
  onResetTimer: () => dispatch(timerActions.resetTimer()),
  onStartTimer: () => dispatch(timerActions.startTimer()),
  onStopTimer: () => dispatch(timerActions.stopTimer()),
});

export default connect(mapStateToProps, mapDispatchToProps)(FinalTestLecture);
