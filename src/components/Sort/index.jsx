import React, {useCallback, useEffect, useState, useRef} from 'react';
import clsx from 'clsx';
import './Sort.scss';

const Sort = () => {
    const sortTypes = ['новинкам', 'популярности'];
    const [sortName, setSortName] = useState('новинкам');
    const [toggleSort, setToggleSort] = useState(false);

    const refSortTitle = useRef(null);
    const refSortDropDown = useRef(null);

    const onClickSort = useCallback((sortType) => {
        setSortName(sortType);
        setToggleSort(prevState => !prevState);
    },[]);

    const toggleSortDropDown = useCallback(() => {
        setToggleSort(prevState => !prevState);
    },[]);

    const closedSortDropDown = useCallback((event) => {
        const title = refSortTitle.current;
        const dropDown = refSortDropDown.current;
        if(title !== event.target && dropDown !== event.target) {
            setToggleSort(false);
        }
    },[]);

    useEffect(() => {
        window.addEventListener('click', closedSortDropDown);
        return () => {
            window.removeEventListener('click', closedSortDropDown);
        }
    },[])

    return (
        <div className="sort">
            <p className="sort-title">Сортировать по: <span ref={refSortTitle} onClick={() => toggleSortDropDown()}>{sortName}</span></p>
            <div className={clsx('sort-dropdown', toggleSort && 'active') } ref={refSortDropDown}>
                <ul>
                    {
                        sortTypes.map((sortType,index) => (
                          <li
                              className={ sortName === sortType ? 'selected' : '' }
                              key={index}
                              onClick={() => onClickSort(sortType)}
                          >{sortType}</li>
                        ))
                    }
                </ul>
            </div>
        </div>
    );
};

export default Sort;
