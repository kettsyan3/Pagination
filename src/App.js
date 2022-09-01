import React from "react";


class App extends React.PureComponent{
    constructor() {
        super();
        this.state = {
            todos : [],
            loading : true,
            error : false,
            from : 0,
            count : 10
        }

    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then(response => response.json())
            .then(todos => {
                this.setState({
                    loading: false,
                    todos : todos
                })
            })

    }

    handleChangeCount = event => {
        this.setState({
            count : +event.target.value
        })
    }

    handlePaginationClick = direction => {
        this.setState(prevState=> {
            if(direction === "next"){
                return {
                    ...prevState,
                    from : prevState.from + prevState.count
                }
            }else{
                return {
                    ...prevState,
                    from : prevState.from - prevState.count
                }
            }
        })
    }




    render() {
        const {loading , todos  , from , count} = this.state;
        console.log(count , from , "render")

        if(loading){
            return  <div>Loading...</div>
        }

        const totalPages = Math.ceil(todos.length / count);
        const page = Math.ceil((from + count) / count);


        return <div>
            {todos.slice(from , from + count).map(todo => {
                return(
                    <div key={todo.id}>
                        {todo.title}
                    </div>
                )
            })}
            <select onChange={this.handleChangeCount}>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
                <option value={200}>200</option>
            </select>
            <div>
                <button disabled={page === 1} onClick={() => this.handlePaginationClick("previous")}>&larr;</button>
                <span>{page}</span>
                of
                <span>{totalPages}</span>
                <button disabled={page === totalPages} onClick={() => this.handlePaginationClick("next")}>&rarr;</button>
            </div>
        </div>;
    }
}

export default App;
