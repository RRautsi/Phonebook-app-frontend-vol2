import { useNavigate } from "react-router-dom";

export default function Unauthorized() {
  const navigate = useNavigate()
  const back = () => navigate(-1)

  return (
    <div className="w-auto m-auto flex flex-col">
      <h1 className="text-4xl text-center mt-6">Unauthorized</h1>
      <p className="text-xl text-center mt-3">Sorry, you are not allowed to access this page.</p>
      <button className="button-custom w-40 m-auto mt-8" onClick={back}>Return to last page</button>
    </div>
  );
}