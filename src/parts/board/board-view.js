import React, { useContext, useState, useEffect } from "react";
import { StoreContext } from "../../hooks/StoreContext"
import './board-styles.css';
import PropTypes from 'prop-types';
import * as SudokuUtils from '../../utils/sudoku_utils'

export const BoardView = (props) => {
    const { state, dispatch, actions } = useContext(StoreContext);
    const {
        board,
        currentCell,
        invalidCells,
        candidates
    } = state.board_reducer;
    
       const solveAnimate = []

    const generateASudoku = () => actions.board.generateSudoku('easy');

    const onCellClicked = (cell) => actions.board.setCurrentCell(cell);
    const connectedCells = state.board_reducer.showConnectedCells? SudokuUtils.getConnectedCells(state.board_reducer.currentCell):[]
    
    const NBR_OF_ROWS = 9;
    const EMPTY_CELL = 0;

    const activeCellStyle = {background: '#639fff'};
    const connectedCellStyle = {background: 'yellow'};
    const solveCellStyle = {background: 'green'};

    const fetchStyleForCell = (i) => {
        if(solveAnimate.includes(i))
            return solveCellStyle;
        else if(currentCell === i)
            return activeCellStyle;
        else if(solveAnimate.length === 0 && connectedCells.includes(i))
            return connectedCellStyle;
        return null;
    }

    const isCandidates = (cell) => (board.get(cell) === EMPTY_CELL && candidates.get(cell));
    const isImmutable = (cell) => (board.getImmutableCells().includes(cell));
    const isInvalid = (cell) => (invalidCells.includes(cell));
    const isNumber = (cell) => (board.get(cell) !== EMPTY_CELL)

    const getDataInCell = (cell) => {
        let number = board.get(cell);
        if(isImmutable(cell)) 
            return <b>{number}</b>
        else if(isInvalid(cell)) 
            return <b style={{color: 'red'}}>{number}</b>
        else if(isNumber(cell)) 
            return number
        else if(isCandidates(cell)) 
            return <CandidatesGrid cellCandidates={candidates.get(cell)}/>
        else 
            return ''
    } 

    return (
        <div>
       <GridTable 
            tableClass={"sudoku-board"}
            rowClass={"sudoku-row"}
            cellClass={"sudoku-cell"}
            nbrOfRows={NBR_OF_ROWS}
            onCellClicked={onCellClicked}
            cellStyle={fetchStyleForCell}
            dataParser={getDataInCell}
        />
        <button onClick={generateASudoku}>Generate</button>
        </div>
    )
};

const CandidatesGrid = (props) => {
    const {
        cellCandidates
    } = props

    const dataParser = (cell) => {
        return cellCandidates.includes(cell+1)? cell+1 : ' ';
    }

    return (
        <GridTable 
            tableClass={"candidates-grid"}
            nbrOfRows={3}
            dataParser={dataParser}
        />
    )
}

const GridTable = (props) => {

    const {
        tableClass,
        rowClass,
        cellClass,
        nbrOfRows,
        onCellClicked,
        cellStyle,
        dataParser
    } = props

    const renderCellsInRow = (row) => {
        let cells = [];
        const firstCellOfRow = row*nbrOfRows;
        const lastCellOfRow = firstCellOfRow + nbrOfRows;

        for(let cell = firstCellOfRow; cell<lastCellOfRow; ++cell) {
            cells.push(
                <td
                    className={cellClass}
                    key={cell}
                    style={cellStyle? cellStyle(cell) : null}
                    onClick={onCellClicked? () => onCellClicked(cell):null}
                >
                    {dataParser(cell)}
                </td>
            )
        }
        return (
            <tr key={row} className={rowClass}>
                {cells}
            </tr>
        )
    }

    const renderRows = () => {
        let rows = [];
        for(let row = 0; row < nbrOfRows; ++row) {
            rows.push(
                    renderCellsInRow(row)
            )
        }

        return (
            <tbody>{rows}</tbody>
        )
    }

    return (
        <table className={tableClass}>
            {renderRows()}
        </table>
    )
}
/*
GridTable.protoTypes = {
    tableClass: PropTypes.string,
    rowClass: PropTypes.string,
    cellClass: PropTypes.string,
    nbrOfRows: PropTypes.number.isRequired,
    onCellClicked: PropTypes.func,
    cellStyle: PropTypes.object,
    dataParser: PropTypes.func.isRequired
}

CandidatesGrid.propTypes = {
    candidates: PropTypes.array.isRequired
}

BoardView.propTypes = {
    board: PropTypes.object.isRequired,
    currentCell: PropTypes.number.isRequired,
    invalidCells: PropTypes.array.isRequired,
    onCellClicked: PropTypes.func.isRequired,
    connectedCells: PropTypes.array.isRequired,
    candidates: PropTypes.instanceOf(Map).isRequired,
    solveAnimate: PropTypes.array.isRequired
};
*/
export default BoardView;
