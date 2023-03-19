import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import Timer from '../../components/Timer';
import CustomLink from '../../components/CustomLink';
import { useHistory } from "react-router-dom";
import './index.scss';

import * as timerActions from '../../redux/timer/timer.actions';
import * as selectors from '../../redux/rootReducer';

const InitialTestLecture = ({
  authUser,
  onStartTimer,
  onStopTimer,
}) => {
  const history = useHistory();

  useEffect(() => {
    onStartTimer();
  }, [onStartTimer]);

  useEffect(() => {
    if (authUser.has_completed_initial_test) {
      history.push("/dashboard");
    }
  }, [authUser, history]);

  return (
    <Fragment>
      <div className="page-container--initial-test-lecture">
        <div className="initial-test-lecture">
          <h1 className="initial-test-lecture__title">
            Lectura de diagnóstico
          </h1>
          <div className="initial-test-lecture__timer-container">
            <div className="initial-test-lecture__timer-label">
              Tiempo de lectura:
            </div>
            <Timer />
          </div>
          <div className="initial-test-lecture__lecture-container">
            <div className="initial-test-lecture__lecture-title">
              El precio del humo
            </div>
            <div className="initial-test-lecture__text">
              <p>
                Un día, un campesino fue a la ciudad a vender sus productos. De regreso a casa entró en una posada a
                descansar un rato. Como era día de mercado, la posada se encontraba llena de gente.
              </p>
              <p>
                - ¿Qué quieres comer? - le preguntó el posadero.
              </p>
              <p>
                - Una hogaza de pan y un jarrillo de vino - respondió el campesino.
              </p>
              <p>
                Mientras el posadero se alejaba, el campesino fijó sus ojos en una pieza que estaba asándose en la chimenea y
                que desprendía un olor delicioso ¡Cuánto le gustaría tomar un poco de aquella carne! Pero... ¡A saber cuánto costaba!
              </p>
              <p>
                Al cabo de un rato, el posadero regresó con el pan y con el jarrillo de vino. El campesino empezó a comer sin
                poder apartar los ojos del asado... ¡olía tan bien!
              </p>
              <p>
                De pronto, tuvo una idea. Se levantó con el pan en la mano y se acercó al fuego. Colocó el pan sobre el humo
                que despedía el asado y esperó unos minutos. Cuando el pan se impregnó bien de aquel olor tan suculento, lo
                retiró del fuego y se dispuso a comer. Pero al ir a morderlo oyó una voz que gritaba:
              </p>
              <p>
                - Te crees muy listo, ¿verdad? Intentabas engañarme, pero tendrás que pagar lo que me has robado.
              </p>
              <p>
                Los gritos del posadero despertaron la curiosidad de la gente. Las conversaciones se interrumpieron y todo el mundo miró hacia los dos hombres.
              </p>
              <p>
                - Yo...yo no te he quitado nada. Te pagaré el pan y el vino.
              </p>
              <p>
                - Sí, claro... ¿y el humo, qué? ¿Acaso no piensas pagarlo?
              </p>
              <p>
                El campesino, sin salir de su asombro, intentaba defenderse:
              </p>
              <p>
                - El humo no vale nada, pensé que no te importaría...
              </p>
              <p>
                - ¿Cómo que el humo no vale nada? Todo lo que hay en esta posada es mío. Y quien lo quiera, debe pagar por ello.
              </p>
              <p>
                En ese momento, un noble que se encontraba comiendo en la posada con otros ilustres caballeros intervino en la discusión:
              </p>
              <p>
                - ¡Cálmate, posadero! ¿Cuánto pides por el humo?
              </p>
              <p>
                - Me conformo con cuatro monedas- respondió satisfecho el posadero. El pobre campesino exclamó preocupado:
              </p>
              <p>
                - ¡Cuatro monedas! Es todo lo que he ganado hoy.
              </p>
              <p>
                Entonces el noble se acercó al campesino y le dijo algo en voz baja. El campesino abrió su bolsa y le dio sus cuatro monedas al caballero.
              </p>
              <p>
                - Escucha, posadero- dijo el noble haciendo sonar en su mano las monedas- Ya estás pagado.
              </p>
              <p>
                - ¿Cómo que ya estoy pagado? ¡Dadme las monedas!
              </p>
              <p>
                “¡Clin, clin!”, sonaban las monedas en la mano del noble.
              </p>
              <p>
                -¿Las monedas? -preguntó el posadero-.
              </p>
              <p>
                -¿Acaso se comió la carne el campesino?
              </p>
              <p>
                Él sólo cogió el humo. Pues para pagar el humo del asado bastará con el ruido de las monedas.Y ante las risas de todos, el posadero no tuvo más remedio que volver a su trabajo y dejar marchar tranquilamente al campesino.
              </p>
            </div>
            <hr></hr>
            <CustomLink
              className="initial-test-lecture__link"
              to="/initial-test-questions"
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
  onStartTimer: () => dispatch(timerActions.startTimer()),
  onStopTimer: () => dispatch(timerActions.stopTimer()),
});

export default connect(mapStateToProps, mapDispatchToProps)(InitialTestLecture);
