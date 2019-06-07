import React, { useContext, useState, useEffect } from "react";
import { StoreContext } from "../../hooks/StoreContext"
import PropTypes from 'prop-types'
import './highscore-styles.css'

const HighscoreView = (props) => {
    const {
        onToggleShowHighscore,
        showHighscore,
        highscores = []
    } = props;

    const renderRow = (highscore) => {
        return (
        <tr>
            <td>
                {highscore.difficulty}
            </td>
            <td>
                {highscore.time}
            </td>
        </tr>
        )
    }

    const renderRows = () => {
        let rows = []
        highscores.forEach(highscore => {
            rows.push(renderRow(highscore))
        })
        return (
            <tbody className="highscore-table-body">
                {rows}
            </tbody>
        )
    }

    return (
        <React.Fragment>
            <button onClick={onToggleShowHighscore} className="btn-highscore">Bästa resultaten</button>
            <div style={showHighscore? {display: 'block'}:{display: 'none'}}>
                <table className="highscore-table">
                    <thead className="highscore-table-head">
                        <tr>
                            <td>
                                Svårighetsgrad
                            </td>
                            <td>
                                Tid
                            </td>
                        </tr>
                    </thead>
                    {
                        renderRows()
                    }  

                </table>
            </div> 
        </React.Fragment>
    )
}
/*
HighscoreView.propTypes = {
    onToggleShowHighscore: PropTypes.func.isRequired,
    showHighscore: PropTypes.bool.isRequired
}
*/
export default HighscoreView;