import styles from './Board.module.scss';
import Card from 'components/Card/Card';
import { useRef, useState } from 'react';

const Board = ({ list, onAddTask, onMoveTask }) => {
	const [newCard, setNewCard] = useState(null);
	const boardRef = useRef(null);

	const onBlurCard = (event) => {
		// persist the event since we are passing it forward | Synthetic Event
		event.persist();
		const label = event.target.value;
		// If label wasn't empty add this to localstorage and re render
		if (label) {
			onAddTask(label, list.id);
		}
		// hide the add card box
		setNewCard(null);
	};

	// when add new card button is clicked a empty cardbox with input focussed opens up
	const addNewCard = () => {
		setNewCard({});
	};

	/* In the case of dragging something a link, prevent the browser's default behavior, 
	which is to navigate to that link */
	const onDragOver = (e) => {
		if (e.preventDefault) {
			e.preventDefault();
		}

		return false;
	};

	/* drag enter used to add a border to dotted hovered column and a pointer events none class added
	 to parent to defer any drag event on nested children. Drag Over can also be used for the same,
	 but the triggers for dragover are too many while hovering, so it's not render friendly. */
	const onDragEnter = (e) => {
		boardRef.current.classList.add("drag");
		const el = e.target;
		if (el.classList.contains("drag")) {
			el.classList.add("over");
		}
	};

	// on leaving the drag over the column, remove the dotted border
	const onDragLeave = (e) => {
		const el = e.target;
		el.classList.remove("over");
	};

	/* We get the data from transfer which is our task id and remove the dotted border. Since we added
	a pointer events none class on column children to prevent any drag events on children, we remove all the drag classes
	from the document since the drop event won't be called on the other columns where hover was done but item was not dropped.
	Also we call the move task method which updates the task in new board and re renders.*/
	const onDrop = (e) => {
		e.stopPropagation();
		const cardId = e.dataTransfer.getData("text/plain");
		const el = e.target;
		el.classList.remove("over");
		Array.from(document.querySelectorAll(".drag")).forEach((el) =>
			el.classList.remove("drag")
		);
		if (cardId) {
			onMoveTask(+cardId, list.id);
		}
		return false;
	};

	return (
		<div
			ref={boardRef}
			className={styles.board}
			onDragOver={onDragOver}
			onDragEnter={onDragEnter}
			onDragLeave={onDragLeave}
			onDrop={onDrop}
		>
			<h5 className={styles.board__header}>{list.boardLabel}</h5>
			<div className={styles.board__content}>
				{list.cards.map((item) => {
					return <Card card={item} key={item.id} />;
				})}
				{newCard && (
					<Card card={newCard} isEditable={true} onBlurEvent={onBlurCard} />
				)}
			</div>
			{!newCard && (
				<div className={styles.board__footer}>
					<button
						className={`${styles.board__footer__label} no-style-btn`}
						onClick={addNewCard}
					>
						+ Add another card
					</button>
				</div>
			)}
		</div>
	);
};

export default Board;
