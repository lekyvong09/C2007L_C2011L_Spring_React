import { useDispatch, useSelector } from 'react-redux';
import { store } from '../../store';
import styles from './Counter.module.css';
import { decrement } from './counterSlice';

export default function Counter() {
    const dispatch = useDispatch<typeof store.dispatch>();
    const count = useSelector((state: any) => state.counter.value);
    return (
        <>
            <div className={styles.row}>
                <button
                    className={styles.button}
                    onClick={() => dispatch(decrement())}
                >
                    -
                </button>
                <span className={styles.value}>
                    {count}
                </span>

            </div>
        </>
    );
}