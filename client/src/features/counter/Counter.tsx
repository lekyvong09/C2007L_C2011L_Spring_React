import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { store } from '../../store';
import styles from './Counter.module.css';
import { decrement, increment, incrementAsync, incrementByAmount } from './counterSlice';

export default function Counter() {
    const dispatch = useDispatch<typeof store.dispatch>();
    const count = useSelector((state: any) => state.counter.value);

    const [incrementAmount, setIncrementAmount] = useState('2');

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

                <button 
                    className={styles.button}
                    onClick={() => dispatch(increment())}
                >
                    +
                </button>
            </div>

            <div className={styles.row}>
                <input 
                    className={styles.textbox}
                    value={incrementAmount}
                    onChange={(e) => setIncrementAmount(e.target.value)}
                />
                <button
                    className={styles.button}
                    onClick={() => dispatch(incrementByAmount(Number(incrementAmount) || 0))}
                >
                    Add Amount
                </button>

                <button
                    className={styles.button}
                    onClick={() => dispatch(incrementAsync(Number(incrementAmount) || 0))}
                >
                    Add Async
                </button>
            </div>

        </>
    );
}