import { Link, useNavigate } from "react-router-dom"


const ErrorPage = () => {

  const navigate = useNavigate()
  const back = () => navigate(-1)

  return (
    <>
      <div className="w-auto m-auto">
        <h1 className="text-2xl md:text-4xl text-center mt-6">404 - PAGE NOT FOUND</h1>
      </div>
      <div className="w-auto h-96 m-auto mt-10 flex flex-col items-center">
        <h1 className="text-3xl md:text-5xl text-center">Oops!</h1>
        <p className="text-2xl md:text-4xl text-center mt-3">It seems you have wandered off the grid...</p>
        <button onClick={back} className="mt-10">
          <p className="text-2xl md:text-4xl hover:text-blue-700">Take me to last page</p>
        </button>
        <Link to="/" className="mt-2">
          <p className="text-2xl md:text-4xl text-center mt-3 hover:text-blue-700">Take me to home page</p>
        </Link>
      </div>
    </>
  )
}

export default ErrorPage
