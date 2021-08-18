import styles from './Layout.module.scss';
import Board from 'containers/Board/Board';
import useBoards from 'hooks/useBoards';
import Loader from 'components/Loader/Loader';

const Layout = () => {
  const { data: boardsData, addTask, moveTask } = useBoards();

  if (!boardsData) {
    return <Loader />;
  }

  const onAddTask = (label, board_id) => {
    addTask(label, board_id);
  }

  const onMoveTask = (task_id, board_id) => {
    moveTask(task_id, board_id);
  }

	return (
		<div className={styles.lists}>
			{boardsData.map((item) => {
				return (
					<div className={styles.lists__content} key={item.id}>
						<Board list={item} onAddTask={onAddTask} onMoveTask={onMoveTask} />
					</div>
				);
			})}
		</div>
	);
};

export default Layout;
