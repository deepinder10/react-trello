import { useEffect, useState } from "react";
import boardJSON from 'data/boards';
import randomNumber from "functions/randomNumberGen";

const BOARD_KEY = "board";

const useBoards = () => {
  const [data, setData] = useState();
	
	// check if board data exists in local, if not setup the sample data
	useEffect(() => {
		const board = localStorage.getItem(BOARD_KEY);

		if (board) {
			setData(JSON.parse(board));
		} else {
			localStorage.setItem(BOARD_KEY, JSON.stringify(boardJSON));
			setData(boardJSON);
		}
	}, []);

	/* to add a new task we add it to the array and generating a random id for the task so that it can be identified,
	although this can be repeated, but considering an actual use case that is the database, it won't be possible. */
	const addTask = (label, board_id) => {
		const cloned = [...data];
		const board = cloned.find((item) => item.id === board_id);
		// push the new task into cards list and update the local storage
		board.cards.push({
			id: randomNumber(10, 10000),
			label,
		});
		setData(cloned);
		localStorage.setItem(BOARD_KEY, JSON.stringify(cloned));
	}

	/* For moving the task, we first find the task being moved in the boards and splice it from the cards array and then
	find the destination board and push the task into the cards of new board and set it to local storage.*/
	const moveTask = (task_id, board_id) => {
		const cloned = [...data];
		let movedItem;
		cloned.forEach(board => {
			const foundIndex = board.cards.findIndex(task => task.id === task_id);
			if (foundIndex > -1) {
				[movedItem] = board.cards.splice(foundIndex, 1);
			}
		})
		const destinationBoard = cloned.find((item) => item.id === board_id);
		// push the new task into cards list and update the local storage
		destinationBoard.cards.push(movedItem);
		setData(cloned);
		localStorage.setItem(BOARD_KEY, JSON.stringify(cloned));
	};

	return { data, addTask, moveTask };
}

export default useBoards;