function App() {
    return (
        <>
            <div className='flex bg-black flex-col text-white'>
                <div className='flex'>
                    <aside className='w-3/12 m-2'>
                        <div className='bg-gray-700 rounded-md mx-2 p-2'>
                            search and home
                        </div>
                        <div className='bg-gray-700 rounded-md mx-2 d-2'>
                            playlists
                        </div>
                    </aside>
                    <main className='flex-1 bg-gray-700 m-2 p-2 rounded-md '>
                        main content here
                    </main>
                </div>
                <footer>player</footer>
            </div>
        </>
    );
}

export default App;
