import styles from './Card.module.scss';

const Card = ({ card, onBlurEvent, isEditable = false }) => {
	// when drag starts on the card, we reduce the opacity and set the data in transfer data
  const onDragStart = (e) => {
		let el = e.target;
		el.style.opacity = "0.4";
		e.dataTransfer.effectAllowed = "move";
		e.dataTransfer.setData("text/plain", card.id);
	}

	// restore the opacity on drag ending
	const onDragEnd = (e) => {
		let el = e.target;
		el.style.opacity = "1";
	};

	// handle card add on enter key along with blur event
	const handleKeyDown = (e) => {
		if (e.key === "Enter") {
			onBlurEvent(e);
		}
	}

	return (
		<div
			className={styles.card}
			onDragStart={onDragStart}
			onDragEnd={onDragEnd}
			draggable={!isEditable}
		>
			{!isEditable ? (
				<span className={styles.card__label}>{card.label}</span>
			) : (
				<input
					className={styles.card__input}
					autoFocus
					placeholder="Enter a title for this card"
					onKeyDown={handleKeyDown}
					onBlur={onBlurEvent}
				/>
			)}
		</div>
	);
};

export default Card;
