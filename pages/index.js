import {useEffect, useState} from 'react';
import makeCallApi from "../helpers/makeCallApi";


const Index = (res = null) => {

    const [info, setInfo] = useState(res);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        async function load() {
            if (!res) {
                res = await makeCallApi();
            }
            setInfo(res);
        }

        load();
    }, []);

    //При вводе в Input
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    //OnSubmit
    const handleSubmit = async () => {
        event.preventDefault();
        res = await makeCallApi(`?address=${inputValue}`, 'POST');
        setInfo(res);
    };

    //Загрузить все запросы. Добавлено в связи с реализацией БД на MongoDB, там сложности с разграничением доступа.
    //Для доступа, пришлось бы высылать каждому пользователю приглашение в проект. Поэтому принял решение
    //Сделать данную функцию, которая возвращает все значения из БД
    const handeLoadAll = async () => {
        event.preventDefault();
        res = await makeCallApi(`/all`);
        setInfo(res);
    };

    if (!info) return <h2>Loading...</h2>;

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>
                    Адрес:
                    <input type="text" value={inputValue} onChange={handleInputChange}/>
                </label>
                <input type="submit" value="Запросить"/>
            </form>
            {/*Для загрузки данных с БД*/}
            <button onClick={handeLoadAll}>Загрузить все запросы</button>
            <pre suppressHydrationWarning={true}>{JSON.stringify(info, null, 2)}</pre>
        </>
    )
};

//**?
Index.getInitialProps = async () => {
    const res = await makeCallApi();
    return res;
};

export default Index;