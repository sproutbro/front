//박스형식의 게시글 UI

export function Board() {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/posts").then((response) => {
      setBoards(response.data);
    });
  }, []);
  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto p-4">
          <h1 className="mb-4 text-4xl font-bold">The Boxing</h1>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {boards.map((board) => (
              <Link
                to={`/board/${board.id}`}
                key={board.id}
                className="block rounded-lg bg-white p-4 shadow-md hover:bg-gray-100"
              >
                <div className="mb-2 text-sm text-gray-500">{board.author}</div>
                <div className="mb-2 text-lg font-bold">{board.title}</div>
                <div className="mb-2 text-sm text-gray-500">{board.body}</div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>조회 {Math.floor(Math.random() * 1000)}</span>
                  <span>{Math.floor(Math.random() * 24)}시간 전</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

//라인형태
<div className="min-h-screen bg-gray-100">
  <div className="container mx-auto p-4">
    <div className="divide-y divide-gray-300">
      {boards.map((board) => (
        <div
          key={board.id}
          className="py-4 transition-colors duration-150 hover:bg-gray-100"
        >
          <Link to={`/board/${board.id}`}>
            <div className="mb-1 text-sm text-gray-500">{board.author}</div>
            <div className="mb-1 text-lg font-bold">{board.title}</div>
            <div className="mb-2 truncate text-sm text-gray-500">
              {board.body}
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>조회 {Math.floor(Math.random() * 1000)}</span>
              <span>{Math.floor(Math.random() * 24)}시간 전</span>
            </div>
          </Link>
        </div>
      ))}
    </div>
  </div>
</div>;
