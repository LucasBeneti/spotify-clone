import { Sidebar } from './components/Sidebar';
function App() {
    return (
        <>
            <div className='flex bg-black flex-col text-white'>
                <div className='flex '>
                    <Sidebar />
                    <main className='flex-1 bg-base my-2 p-2 rounded-md '>
                        main content here
                    </main>
                </div>
                <footer>player</footer>
            </div>
        </>
    );
}

export default App;
